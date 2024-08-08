import axios from "axios";
import cheerio from "cheerio";
import {
  compareDates,
  formatDateAsUnix,
  formatTypeCall,
  formatSectors,
  formatSalaryRange,
  formatEmploymentPeriod,
  splitLocationString,
  processLink
} from "./utils.js";


const baseUrl = process.env.DALEELMADANI_URL || "https://daleel-madani.org";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchCalls = async () => {
  let page = 0;

  while (true) {
    const url = `${baseUrl}/calls-for-proposal?page=${page}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const parentBlocks = $("div.col-sm-12");
    if (parentBlocks.length === 0) {
      break;
    }

    for (let block of parentBlocks) {
      const CallLinkTag = $(block).find("div.field-name-title-field a");
      const title = CallLinkTag.text().trim();
      let link = CallLinkTag.attr("href");
      if (link.startsWith("/")) {
        link = baseUrl + link;
      }

      const deadlineOut = $(block)
        .find(
          "div.field-name-field-application-deadline .date-display-single"
        )
        .text()
        .trim();
         const locationOutside = $(block)
        .find("div.field-name-field-country-multiple .field-items")
        .text()
        .trim();




      // Fetch details from job link
      const CallResponse = await axios.get(link);
      const CallSoup = cheerio.load(CallResponse.data);

      const deadlineIn = CallSoup(
        ".views-field-field-application-deadline .field-content .date-display-single"
      ).text().trim();

      const CallType = CallSoup(".views-field-field-type-of-call .field-content").text().trim();
      const Sectors = CallSoup(".views-field-field-intervention-sector-s- .field-content").text().trim();
      const remunerationRange = CallSoup(".views-field-field-remuneration-range .field-content").text().trim();
      const Duration = CallSoup(".views-field-field-period-of-employment .field-content").text().trim();

      const deadline = compareDates(deadlineOut, deadlineIn);


      const CallDetails = {
        url: link,
        title: title,
        deadlineDaleel: formatDateAsUnix(deadline, "EEEE, dd MMMM yyyy"),
        CallTypeDaleel: formatTypeCall(CallType),
        Sectors : formatSectors(Sectors),
        remunerationRange : formatSalaryRange(remunerationRange),
        Duration : formatEmploymentPeriod(Duration),
        Formattedlocation : splitLocationString(locationOutside),
        key : processLink(link)

      };

      //path of pushing in firebase

      console.log(JSON.stringify(CallDetails, null, 2));
      await delay(2000);
    }
    page += 1;
  }
};
console.log(process.env.DALEELMADANI_URL);


fetchCalls()
  .then((allCalls) => {
    console.log(allCalls);
  })
  .catch((error) => {
    console.error("Error fetching Calls:", error);
  });
