import axios from 'axios';
import cheerio from 'cheerio';
import "dotenv/config";
import { formatDate, formatLocation,parseDegree ,formatSalaryRange , formatSalary, formatEmploymentPeriod, compareDates, formatDateAsUnix , formatString,splitLocationString,contractDaleel,parseYesNo,sectorsFormat, parseExperience} from './utils.js';

const baseUrl = process.env.DALEELMADANI_URL || 'https://daleel-madani.org'

export const fetchJobs = async () => {
    const allJobs = [];
    let page = 0;

    while (true) {
        const url = `${baseUrl}/jobs?page=${page}`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const parentBlocks = $('div.col-sm-12');
        if (parentBlocks.length === 0) {
            break;
        }



        for (let block of parentBlocks) {
            const jobLinkTag = $(block).find('div.field-name-title-field a');
            const title = jobLinkTag.text().trim();
            const location = $(block).find('div.field-name-field-locations .shs-term-selected').text().trim();
            const contractType = $(block).find('div.field-name-field-contract-type').text().trim();
            const deadlineOut = $(block).find('div.field-name-field-job-application-deadline .date-display-single').text().trim();
            const agency = $(block).find('div.field-name-og-group-ref a').text().trim();
            let link = jobLinkTag.attr('href');
            if (link.startsWith('/')) {
                link = baseUrl + link;
            }

            // Fetch details from job link
            const jobResponse = await axios.get(link);
            const jobSoup = cheerio.load(jobResponse.data);
            const locationInside = jobSoup('.field-name-field-locations li').text().trim();
            const requiresCoverLetter = jobSoup('.field-name-field-requires-a-cover-letter- .field-item').text().trim();
            const modifiedDate = jobSoup('.field-name-changed-date .field-item').text().trim();
            const sectors = jobSoup('.views-field-field-intervention-sector-s- .field-content').text().trim();
            const deadlineIn = jobSoup('.views-field-field-job-application-deadline .field-content .date-display-single').text().trim();
            const employmentPeriod = jobSoup('.views-field-field-period-of-employment .field-content').text().trim();
            const salary = jobSoup('.views-field-field-salary .field-content').text().trim();
            const salaryRange = jobSoup('.views-field-field-salary-range .field-content').text().trim();
            const educationDegree = jobSoup('.views-field-field-education-degree-details .field-content').text().trim();
            const experience = jobSoup('.views-field-field-experience-requirements .field-content').text().trim();
            const deadline=compareDates(deadlineOut,deadlineIn);
     



            

            const jobDetails = {
                url: link,
                title: title,
                location: formatLocation(location),
                locationInside: formatLocation(locationInside),
                //formatted here without my array
                locationInsideFormatted : formatString(locationInside),
                //formatted belong my array
                formattedLocations : splitLocationString(locationInside),
                contractType: contractType.toUpperCase(),
                contractDaleel : contractDaleel(contractType),
                deadline: formatDate(deadline, 'EEEE, dd MMMM yyyy'),
                 modifiedDate: formatDate(modifiedDate, 'dd MMM, yyyy'),
                deadlineDaleel: formatDateAsUnix(deadline,'EEEE, dd MMMM yyyy'),
                modifiedDaleel: formatDateAsUnix(modifiedDate,'dd MMM, yyyy'),
                agency: agency,
                coverLetter: parseYesNo(requiresCoverLetter.toUpperCase()),
                sectors: sectorsFormat(sectors),
                employmentPeriod: formatEmploymentPeriod(employmentPeriod),
                salary: formatSalary(salary),
                salaryRange: formatSalaryRange(salaryRange),
                educationDegree: educationDegree,
                DaleelDegree : parseDegree(educationDegree),
                deadlineAppOut : deadlineOut,
                deadlineAppIn : deadlineIn,
                experience : parseExperience(experience),

            };

            allJobs.push(jobDetails);

            // Print job details
            console.log(`Title: ${jobDetails.title}`);
            console.log(`Link: ${jobDetails.url}`);
            console.log(`Location: ${jobDetails.location}`);
            console.log(`LocationInSideFormatted: ${jobDetails.locationInsideFormatted}`);
            console.log(`DaleelArrayLocation: ${jobDetails.formattedLocations}`);
            console.log(`ContractType: ${jobDetails.contractType}`);
            console.log(`ContractTypeDaleel: ${jobDetails.contractDaleel}`);
            console.log(`DeadlineAppOut: ${jobDetails.deadlineAppOut}`);
            console.log(`DeadlineAppIn: ${jobDetails.deadlineAppIn}`);
             console.log(`Deadline Daleel: ${jobDetails.deadlineDaleel}`);
            console.log(`Modified Daleel: ${jobDetails.modifiedDaleel}`);
            console.log(`agency: ${jobDetails.agency}`);
            console.log(`Cover Letter: ${jobDetails.coverLetter}`);
            console.log(`Sectors: ${jobDetails.sectors}`);
            console.log(`Employment period: ${JSON.stringify(jobDetails.employmentPeriod, null, 2)} `) ;
            console.log(`Salary:  ${JSON.stringify(jobDetails.salary, null, 2)}`) ;
            console.log(`Salary range:  ${JSON.stringify(jobDetails.salaryRange, null, 2)}`);
            console.log(`Education degree: ${jobDetails.educationDegree}`);
            console.log(`Daleel degree: ${jobDetails.DaleelDegree}`);
             console.log(`Experience: ${jobDetails.experience}`);
             console.log();
        }
        page += 1;
    }

    return allJobs;
    
};

console.log(process.env.DALEELMADANI_URL)

fetchJobs().then((allJobs) => {
    console.log(allJobs);
}).catch((error) => {
    console.error('Error fetching jobs:', error);
});
