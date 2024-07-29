import { parse, format } from 'date-fns';

export const formatDate = (dateStr, inputFormat) => {
    const dateObj = parse(dateStr, inputFormat, new Date());
    return format(dateObj, "yyyy-MM-dd'T'HH:mm:ssXXX");
  };

export const formatDateAsUnix = (dateStr, inputFormat) => {
  const dateObj = parse(dateStr, inputFormat, new Date());
  return Math.floor(dateObj.getTime() / 1000);
};

export const formatLocation = (location) => {
    return location.split('>').map(loc => loc.trim());
};



    const validSectors = [
    'Coordination & Information management',
    'Development',
    'Education',
    'Gender issue',
    'Human Rights & Protection',
    'Advocacy & Awareness',
    'Gender issues',
    'Relief Services',
    'Water sanitation and hygiene',
    'Children & Youth',
    'Conflict Resolution',
    'Infrastructure & Services Rehabilitation',
    'Research & Studies',
    'Communications & Media',
    'Agriculture',
    'Health',
    'Refugees',
    'Environment',
    'Safety and Security',
    'Disability',
    'Food & Nutrition',
    'Women Status & Issues',
    'Social & Cultural Development',
    'Good governance and transparency',
    'Science & Technology',
    'Law & Legal Affairs',
    'Mental Health',
    'Peace & Security',
    'Sports & Recreation',
    'Training & Capacity Building'
];

export const formatValidSectors = (sectorsStr) => {

    const sectors = sectorsStr.split(',');
    const filteredSectors =sectors.filter(sector => validSectors.includes(sector))

    const final = filteredSectors
    .map(sector => sector.trim().toLowerCase().replace(/\s+/g, '_').replace(/&/g,'and'));
    return final;
};


//invalid sectors
export const formatInSectors = (sectorsStr) => {

    const sectors = sectorsStr.split(',');
    const invalidSectors = sectors.filter(sector => !(validSectors.includes(sector)));
    const final = invalidSectors
    .map(sector => sector.trim().toLowerCase().replace(/\s+/g, '_').replace(/&/g,'and'));
    return final;
};


const validmajors= [
'information management', 
'computer science', 
'data science',
'public health', 
'data management system',
'Political Science', 
'Public Policy', 
'Environmental Studies',
'Public Law', 
'Social Science',
'Psychomotor therapy',
'Business Administration', 
'Business Management',
'Information Technology', 
'Statistics',
'economics',
'Sociology',
'Information systems',
'Environmental Health',
'Engineering',
'Monitoring and Evaluation',
'Sanitation',
'Hygiene',
'Demography',
'Social studies',
'Journalism', 
'Media', 
'Communications', 
'Finance', 
'Accounting', 
'project management', 
'gender', 
'development studies', 
'conflict management', 
'Social Work', 
'MBA', 
'International Law', 
'IT-Computer', 
'PR-Protection', 
'PR-Refugee', 
'Education', 
'children', 
'Resources Management', 
'advocacy', 
'women’s economic empowerment', 
'project cycle management', 
'management', 
'Nurse', 
'Nursing', 
'Business', 
'social', 
'English Literature', 
'Psychology'

];


export const formatvalidmajors = (majorStr) => {
     // Split the input string by comma and trim each major
    const majors = majorStr.split(',').map(major => major.trim());

    // Preprocess valid majors to match the same format
    const processedValidMajors = validmajors.map(major => major.trim().toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and'));

    // Process each major by trimming, converting to lowercase, replacing spaces with underscores, and '&' with 'and'
    const formattedMajors = majors.map(major => major.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and'));

    // Filter the input majors to find matches in the valid majors
    const filteredMajors = formattedMajors.filter(major => processedValidMajors.includes(major));

    // Return the filtered majors
    return filteredMajors;
};


export const  compareDates = (dateStr1, dateStr2) => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
  
    if (date1 <= date2) {
      return dateStr1;
    } else {
      return dateStr2;
    }
  };



  

  export const formatSalaryRange = (salaryRange) => {
    salaryRange = salaryRange.trim();
    const matchA = salaryRange.match(/(\d+)\s*to\s*(\d+)\s*\((USD|\$)\)/);
    const matchB = salaryRange.match(/>\s*(\d+)\s*\((USD|\$)\)/);
    const matchC = salaryRange.match(/<\s*(\d+)\s*\((USD|\$)\)/);

    if (matchA) {
        return {
            from: parseInt(matchA[1]),
            to: parseInt(matchA[2]),
            currency: matchA[3] || 'USD',
            description: salaryRange
        };
    } else if (matchB) {
        return {
            from: parseInt(matchB[1]),
            to: 0,
            currency: matchB[2] || 'USD',
            description: salaryRange
        };
    } else if (matchC) {
        return {
            from: 0,
            to: parseInt(matchC[1]),
            currency: matchC[2] || 'USD',
            description: salaryRange
        };
    } else {
        return {
            from: 0,
            to: 0,
            currency: 'USD',
            description: salaryRange
        };
    }
};



export const formatSalary = (salary) => {
    salary = salary.trim();

    const matchA = salary.match(/(\d+)\s*-\s*(\d+)\s*(USD|\$)/);
    const matchB = salary.match(/(\d+)\s*(USD|\$)/);
    const matchC = salary.match(/(\d+)\s*-\s*(\d+)\s*(USD|\$)\s*for the Project/);
    const matchD = salary.match(/(\d+)\s*to\s*(\d+)\s*(USD|\$)/);
    const matchE = salary.match(/(\d+)\s*\$/);
    const matchF = salary.match(/(\d+)\s*\$/);
    const matchG = salary.match(/\$(\d+\.\d+)\s*per\s*day/);

    if (matchA) {
        return {
            from: parseInt(matchA[1]),
            to: parseInt(matchA[2]),
            currency: matchA[3] || 'USD',
            description: salary
        };
    } else if (matchB) {
        return {
            from: parseInt(matchB[1]),
            to: 0,
            currency: matchB[2] || 'USD',
            description: salary
        };
    } else if (matchC) {
        return {
            from: parseInt(matchC[1]),
            to: parseInt(matchC[2]),
            currency: matchC[3] || 'USD',
            description: salary
        };
    } else if (matchD) {
        return {
            from: parseInt(matchD[1]),
            to: parseInt(matchD[2]),
            currency: matchD[3] || 'USD',
            description: salary
        };
    } else if (matchE) {
        return {
            from: parseInt(matchE[1]),
            to: 0,
            currency: 'USD',
            description: salary
        };
    } else if (matchF) {
        return {
            from: parseInt(matchF[1]),
            to: 0,
            currency: 'USD',
            description: salary
        };
    } else if (matchG) {
        return {
            from: parseFloat(matchG[1]),
            to: 0,
            currency: 'USD',
            description: salary
        };
    } else if (['negotiable', 'n/a', 'competitive', 'to be determined'].includes(salary.toLowerCase())) {
        return {
            from: 0,
            to: 0,
            currency: 'USD',
            description: salary
        };
    } else {
        return {
            from: 0,
            to: 0,
            currency: 'USD',
            description: salary
        };
    }
};



// export const formatEmploymentPeriod = (periodStr) => {
//     const patterns = [
//         { pattern: /(\d+)\s*(months?|years?)/, handler: (match) => ({ number: parseInt(match[1]), scale: match[2].toLowerCase() }) },
//         { pattern: /Till (the )?end (of )?(\w+ \d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
//         { pattern: /(\d+)\s+Months/, handler: (match) => ({ number: parseInt(match[1]), scale: 'months' }) },
//         { pattern: /(\d+) (months?|years?) From (\w+ \d{1,2}(st|nd|rd|th)?, \d{4}) till (\w+ \d{1,2}(st|nd|rd|th)?, \d{4})/, handler: (match) => ({ number: parseInt(match[1]), scale: match[2].toLowerCase() }) },
//         { pattern: /Until (\d{1,2} \w+ \d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
//         { pattern: /(\d{1,2}) ([A-Za-z]+), (\d{4}) - (\d{1,2}) ([A-Za-z]+), (\d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
//         { pattern: /Permanent/, handler: () => ({ number: 0, scale: 'permanent' }) }
//     ];
    
//     for (let { pattern, handler } of patterns) {
//         const match = periodStr.match(pattern);
//         if (match) {
//             return handler(match);
//         }
//     }

//     return { number: 0, scale: 'unknown' };
// };

//formatting without my array
export const formatEmploymentPeriod = (periodStr) => {
    const patterns = [
        // Arabic pattern for months or years
        { pattern: /(\d+)\s*(شهر|أشهر|سنة|سنوات)/, handler: (match) => ({ number: parseInt(match[1]), scale: match[2] }) },
        // Arabic pattern for "Till the end of"
        { pattern: /حتى نهاية (\w+ \d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        // Arabic pattern for specific months
        { pattern: /(\d+)\s+أشهر/, handler: (match) => ({ number: parseInt(match[1]), scale: 'أشهر' }) },
        // Arabic pattern for period from date to date
        { pattern: /(\d+) (شهر|سنة) من (\d{1,2} \w+ \d{4}) حتى (\d{1,2} \w+ \d{4})/, handler: (match) => ({ number: parseInt(match[1]), scale: match[2] }) },
        // Arabic pattern for until specific date
        { pattern: /حتى (\d{1,2} \w+ \d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        // Arabic pattern for range of dates
        { pattern: /(\d{1,2}) ([\u0600-\u06FF]+)، (\d{4}) - (\d{1,2}) ([\u0600-\u06FF]+)، (\d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        // Arabic pattern for permanent employment
        { pattern: /دائم/, handler: () => ({ number: 0, scale: 'دائم' }) },
        // English pattern for months or years
        { pattern: /(\d+)\s*(months?|years?)/, handler: (match) => ({ number: parseInt(match[1]), scale: match[2].toLowerCase() }) },
        // English pattern for "Till the end of"
        { pattern: /till the end of (\w+ \d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        // English pattern for specific months
        { pattern: /(\d+)\s+months?/, handler: (match) => ({ number: parseInt(match[1]), scale: 'months' }) },
        // English pattern for period from date to date
        { pattern: /(\d+) (months?|years?) from (\w+ \d{1,2}(st|nd|rd|th)?, \d{4}) till (\w+ \d{1,2}(st|nd|rd|th)?, \d{4})/, handler: (match) => ({ number: parseInt(match[1]), scale: match[2].toLowerCase() }) },
        // English pattern for until specific date
        { pattern: /until (\d{1,2} \w+ \d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        // English pattern for range of dates
        { pattern: /(\d{1,2}) ([A-Za-z]+), (\d{4}) - (\d{1,2}) ([A-Za-z]+), (\d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        // English pattern for permanent employment
        { pattern: /permanent/, handler: () => ({ number: 0, scale: 'permanent' }) }
    ];

    for (let { pattern, handler } of patterns) {
        const match = periodStr.match(pattern);
        if (match) {
            return handler(match);
        }
    }

    return { number: 0, scale: 'unknown' };
};




export function formatString(locationStr){

 // Use a regular expression to add spaces before capitalized words
  let formattedStr = locationStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Use a regular expression to add spaces after special characters (like ‘) if followed by a letter
  formattedStr = formattedStr.replace(/([‘])([A-Za-z])/g, '$1 $2');
  
  // Ensure consistent spacing by splitting and joining the string
  formattedStr = formattedStr.split(' ').join(' ');
  
  return formattedStr;

}






export function splitLocationString(inputStr) {
    const structure = {
        eng: {
            countries: {
                lebanon: {
                    regions: {
                        "beirut": ["beirut"],
                        "mount lebanon": ["matn", "maten", "aley", "baabda", "chouf", "byblos (jbeil)", "keserwan"],
                        "north lebanon": ["tripoli", "batroun", "zgharta", "bsharre", "koura", "akkar"],
                        "beqaa": ["western beqaa", "zahleh", "rachaya"],
                        "south lebanon": ["sidon", "jezzine", "tyr"],
                        "nabatieh": ["nabatiyeh", "hasbaya", "marjaayoun", "bint jbeil"],
                        "baalbek-hermel": ["baalbek", "hermel"]
                    }
                },
                libya: {
                    regions: {
                        "tripoli": ["tripoli"] // Example region in Libya
                    }
                },
                egypt: {},
                syria: {},
                jordan: {},
                qatar: {},
                kenya: {},
                france: {},
                pakistan: {},
                morocco: {},
                tunisia: {},
                turkey: {},
            }
        },
        ara: {
            المناطق: {
                لبنان: {
                    مناطق: {
                        "جبل لبنان": ["متن", "مت    ن", "عاليه", "بعبدا", "شوف", "جبيل", "كسروان"],
                        "الشمال": ["طرابلس", "الكورة", "بشري", "البترون", "عكار", "زغرتا"],
                        "البقاع": ["البقاع الغربي", "الهرمل", "بعلبك", "زحلة", "راشيا"],
                        "بعلبك-الهرمل": ["الهرمل", "بعلبك"],
                        "الجنوب": ["صيدا", "جزين", "صور"],
                        "النبطية": ["النبطية", "حاصبيا", "مرجعيون", "بنت جبيل"],
                        "بيروت": ["بيروت"]
                    }
                },
                ليبيا: {
                    مناطق: {
                        "طرابلس": ["طرابلس"]
                    }
                },
                مصر: {},
                سوريا: {},
                الأردن: {},
                قطر: {},
                كينيا: {},
                فرنسا: {},
                باكستان: {},
                المغرب: {},
                تونس: {},
                تركيا: {},
            }
        }
    };

    const matches = [];
    const addedCombos = new Set(); // To track added combinations

    // Normalize the input for consistent matching
    const normalizedInput = inputStr.toLowerCase().replace(/[^\w\s-]/g, '').trim();

    // Function to add matches to matches array
    function addMatches(country, region, area) {
        let result = country;
        if (region) {
            result += `_${region}`;
        }
        if (area) {
            result += `_${area}`;
        }
        result = result.trim().replace(/\s+/g, '_');

        if (!addedCombos.has(result)) {
            matches.push(result);
            addedCombos.add(result);
        }
    }

    // Function to process matches for a specific country and its regions
    function processCountry(countryKey, regions) {
        for (const regionKey in regions) {
            const region = regions[regionKey];
            let regionMatched = false;
            if (normalizedInput.includes(regionKey.toLowerCase())) {
                addMatches(countryKey, regionKey); // Add region matches
                regionMatched = true;
            }

            for (const area of region) {
                if (normalizedInput.includes(area.toLowerCase())) {
                    if (!regionMatched) {
                        addMatches(countryKey, regionKey); // Add region if not already added
                        regionMatched = true;
                    }
                    addMatches(countryKey, regionKey, area); // Add area matches
                }
            }
        }
    }

    // Check in English structure
    for (const countryKey in structure.eng.countries) {
        const country = structure.eng.countries[countryKey];
        if (normalizedInput.includes(countryKey)) {
            addMatches(countryKey); // Add the country itself

            if (country.regions) {
                processCountry(countryKey, country.regions);
            }
        }
    }

    // Check in Arabic structure
    for (const countryKey in structure.ara.المناطق) {
        const country = structure.ara.المناطق[countryKey];
        if (normalizedInput.includes(countryKey)) {
            addMatches(countryKey); // Add the country itself

            if (country.مناطق) {
                processCountry(countryKey, country.مناطق);
            }
        }
    }

    // Return results directly without additional filtering
    return matches;
}






export function contractDaleel(inputStr) {
      const contractTypes = ["part time", "full time", "freelancer", "consultancy","other","internship","volunteer","short term"];
    const matchesSet = new Set();

    // Normalize the input for consistent matching
    const normalizedInput = inputStr.toLowerCase();

    // Check for each contract type
    for (const contractType of contractTypes) {
        if (normalizedInput.includes(contractType)) {
            const formattedContractType = contractType.replace(/\s+/g, '-');
            matchesSet.add(formattedContractType);
        }
    }

    // Convert set to array and return
    return Array.from(matchesSet);
    

}


export function parseYesNo(input) {
    const normalizedInput = input.trim().toLowerCase();

    if (normalizedInput === "yes") {
        return true;
    } else if (normalizedInput === "no") {
        return false;
    } else {
       return 0
    }
}

export function parseDegree(input) {
    
    // Normalize the input string by converting to lowercase and trimming whitespace
    const normalizedInput = input.toLowerCase().trim();

    // Define mappings of degree keywords to their corresponding output arrays
    const degreeMappings = {
        "bachelor": ["Bachelor"],
        "bs": ["Bachelor"],
        "bss": ["Bachelor"],
        "bachelor's" :["Bachelor"],
        "Bachelor's" :["Bachelor"],
        "phd": ["phd"],
        "doctor": ["phd"],
        "master": ["master"],
        "ms": ["master"],
        "university" : ["University degree"]
    };

    // Split the input string by spaces and check each part
    const parts = normalizedInput.split(/\s+/);

    // Initialize an array to store the matched degrees
    const matchedDegrees = [];

    // Iterate over each part of the input
    parts.forEach(part => {
        if (degreeMappings[part]) {
            matchedDegrees.push(...degreeMappings[part]);
        }
    });

    // Remove duplicates from the matched degrees array
    const uniqueDegrees = [...new Set(matchedDegrees)];

    // Return the unique matched degrees array
    return uniqueDegrees;
}


export function parseExperience(input) {
  const normalizedInput = input.toLowerCase().trim();

  let from = "_";
  let to = "_";
  let period = "_";

  if (normalizedInput.includes("no experience required")) {
    return [`from: ${from}`, `to: ${to}`, `period: ${period}`];
  }

  const periodMapping = {
    "year": "year",
    "years": "year",
    "month": "month",
    "months": "month"
  };

  // Regular expressions for different experience formats
  const regexPatterns = [
    /(\d+)\s*to\s*(\d+)\s*(year|years|month|months)/, 
    /more than\s*(\d+)\s*(year|years|month|months)/,
    /less than\s*(\d+)\s*(year|years|month|months)/,
    /(\d+)\s*(year|years|month|months)/
  ];

  for (const regex of regexPatterns) {
    const match = normalizedInput.match(regex);
    if (match) {
      if (regex === regexPatterns[0]) {
        // For "5 to 10 years" or "2 to 5 months"
        from = parseInt(match[1], 10);
        to = parseInt(match[2], 10);
        period = periodMapping[match[3]];
      } else if (regex === regexPatterns[1]) {
        // For "More than 10 years"
        from = parseInt(match[1], 10);
        to = 100; // Arbitrary high number
        period = periodMapping[match[2]];
      } else if (regex === regexPatterns[2]) {
        // For "Less than 10 years"
        from = 0; // Arbitrary low number
        to = parseInt(match[1], 10);
        period = periodMapping[match[2]];
      } else if (regex === regexPatterns[3]) {
        // For "1 year" or "6 months"
        from = parseInt(match[1], 10);
        to = from;
        period = periodMapping[match[2]];
      }
      break; // Exit loop after finding the first match
    }
  }

return [`from: ${from}`, `to: ${to}`, `period: ${period}`];
}

