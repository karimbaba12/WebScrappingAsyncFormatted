import axios from 'axios';
import cheerio from 'cheerio';
import { formatDate, formatLocation, formatSectors } from './utils';

const baseUrl = process.env.DALEELMADANI_URL || 'https://daleel-madani.org';

const fetchCalls = async () => {
  const allCalls = [];
  let page = 1;

  while (true) {
    try {
      const url = `${baseUrl}/calls-for-proposal?page=${page}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const parentBlocks = $('div.col-sm-12');

      if (parentBlocks.length === 0) break;

      parentBlocks.each((i, block) => {
        const callLinkTag = $(block).find('div.field-name-title-field a');
        const title = callLinkTag.text().trim();
        const location = $(block).find('div.field-name-field-country-multiple .field-item').text().trim();
        const callType = $(block).find('div.field-name-field-type-of-call .field-item').text().trim();
        const deadline = $(block).find('div.field-name-field-application-deadline .date-display-single').text().trim();
        const agency = $(block).find('div.field-name-og-group-ref a').text().trim();
        let link = callLinkTag.attr('href');
        if (link.startsWith('/')) link = baseUrl + link;

        // Fetch details from call link
        const fetchCallDetails = async () => {
          try {
            const callResponse = await axios.get(link);
            const callPage = cheerio.load(callResponse.data);

            // Extract details
            const modifiedDate = callPage('.field-name-changed-date .field-item').text().trim();
            const sectors = callPage('.views-field-field-intervention-sector-s- .field-content').text().trim();
            const durationContract = callPage('.views-field-field-period-of-employment .field-content').text().trim();
            const remunerationRange = callPage('.views-field-field-remuneration-range .field-content').text().trim();

            return {
              url: link,
              title,
              location: formatLocation(location),
              callType: callType.toUpperCase(),
              deadline: formatDate(deadline, 'dddd, dd MMMM yyyy'),
              agency,
              details: {
                modifiedDate: formatDate(modifiedDate, 'dd MMM, yyyy'),
                sectors: formatSectors(sectors),
                durationContract,
                remunerationRange
              }
            };
          } catch (error) {
            console.error(`Error fetching details for ${link}:`, error);
          }
        };

        const callDetails = fetchCallDetails();
        allCalls.push(callDetails);

        // Print call details
        console.log(`title: ${callDetails.title}`);
        console.log(`link: ${callDetails.url}`);
        console.log(`location: ${callDetails.location}`);
        console.log(`call_type: ${callDetails.callType}`);
        console.log(`deadline: ${callDetails.deadline}`);
        console.log(`agency: ${callDetails.agency}`);
        console.log(`details: ${callDetails.details}`);
        console.log();
      });

      page++;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }

  return allCalls;
};

fetchCalls()
  .then(allCalls => console.log(allCalls))
  .catch(error => console.error('Error fetching calls:', error));
