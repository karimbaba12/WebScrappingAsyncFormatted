import axios from "axios";
import cheerio from "cheerio";
import "dotenv/config";
import {
  formatDate,
  formatvalidmajors,
  formatLocation,
  parseDegree,
  formatSalaryRange,
  formatSalary,
  formatEmploymentPeriod,
  compareDates,
  formatDateAsUnix,
  formatString,
  splitLocationString,
  contractDaleel,
  parseYesNo,
  formatValidSectors,
  parseExperience,
  processLink
} from "./utils.js";

import { database, ref, set, signIn, auth } from "./firebaseConfig.js";
const baseUrl = process.env.DALEELMADANI_URL || "https://daleel-madani.org";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchJobs = async () => {
  let page = 0;

  while (true) {
    const url = `${baseUrl}/jobs?page=${page}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const parentBlocks = $("div.col-sm-12");
    if (parentBlocks.length === 0) {
      break;
    }

    for (let block of parentBlocks) {
      const jobLinkTag = $(block).find("div.field-name-title-field a");
      const title = jobLinkTag.text().trim();
       let link = jobLinkTag.attr("href");
      if (link.startsWith("/")) {
        link = baseUrl + link;
      }
      const location = $(block)
        .find("div.field-name-field-locations .shs-term-selected")
        .text()
        .trim();
      const contractType = $(block)
        .find("div.field-name-field-contract-type")
        .text()
        .trim();
      const deadlineOut = $(block)
        .find(
          "div.field-name-field-job-application-deadline .date-display-single"
        )
        .text()
        .trim();
      const agency = $(block)
        .find("div.field-name-og-group-ref a")
        .text()
        .trim();
     

      // Fetch details from job link
      const jobResponse = await axios.get(link);
      const jobSoup = cheerio.load(jobResponse.data);
      const locationInside = jobSoup(".field-name-field-locations li")
        .text()
        .trim();
      const requiresCoverLetter = jobSoup(
        ".field-name-field-requires-a-cover-letter- .field-item"
      )
        .text()
        .trim();
      const modifiedDate = jobSoup(".field-name-changed-date .field-item")
        .text()
        .trim();
      const sectors = jobSoup(
        ".views-field-field-intervention-sector-s- .field-content"
      )
        .text()
        .trim();
      const deadlineIn = jobSoup(
        ".views-field-field-job-application-deadline .field-content .date-display-single"
      )
        .text()
        .trim();
      const employmentPeriod = jobSoup(
        ".views-field-field-period-of-employment .field-content"
      )
        .text()
        .trim();
      const salary = jobSoup(".views-field-field-salary .field-content")
        .text()
        .trim();
      const salaryRange = jobSoup(
        ".views-field-field-salary-range .field-content"
      )
        .text()
        .trim();
      const educationDegree = jobSoup(
        ".views-field-field-education-degree .field-content"
      )
        .text()
        .trim();
      const educationDetails = jobSoup(
        ".views-field-field-education-degree-details .field-content"
      )
        .text()
        .trim();
      const experience = jobSoup(
        ".views-field-field-experience-requirements .field-content"
      )
        .text()
        .trim();
      const deadline = compareDates(deadlineOut, deadlineIn);

      const jobDetails = {
        url: link,
        title: title,
        location: formatLocation(location),
        locationInside: formatLocation(locationInside),
        //formatted here without my array
        locationInsideFormatted: formatString(locationInside),
        //formatted belong my array
        formattedLocations: splitLocationString(locationInside),
        contractType: contractType.toUpperCase(),
        contractDaleel: contractDaleel(contractType),
        deadline: formatDate(deadline, "EEEE, dd MMMM yyyy"),
        modifiedDate: formatDate(modifiedDate, "dd MMM, yyyy"),
        deadlineDaleel: formatDateAsUnix(deadline, "EEEE, dd MMMM yyyy"),
        modifiedDaleel: formatDateAsUnix(modifiedDate, "dd MMM, yyyy"),
        agency: agency,
        coverLetter: parseYesNo(requiresCoverLetter.toUpperCase()),
        sectors: formatValidSectors(sectors),
        employmentPeriod: formatEmploymentPeriod(employmentPeriod),
        salary: formatSalary(salary),
        salaryRange: formatSalaryRange(salaryRange),
        educationDegree: educationDegree,
        DaleelDegree: parseDegree(educationDegree),
        deadlineAppOut: deadlineOut,
        deadlineAppIn: deadlineIn,
        experience: parseExperience(experience),
        educationDetails: parseDegree(educationDetails),
        majors: formatvalidmajors(educationDetails),
        key : processLink(link)
      };

      //path of pushing in firebase
      const jobRef = ref(database, `adminRequests/addJob`);
      await set(jobRef, jobDetails);

      console.log(JSON.stringify(jobDetails, null, 2));
      await delay(10000);
    }
    page += 1;
  }
};
console.log(process.env.DALEELMADANI_URL);

signIn("server@daleel.agency", "asdfghjk")
  .then(() => {
    fetchJobs()
      .then((allJobs) => {
        console.log(allJobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  })
  .catch((error) => {
    console.error("Error signing in:", error);
  });
