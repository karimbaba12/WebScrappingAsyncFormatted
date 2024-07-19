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


export const formatSectors = (sectorsStr) => {
    return sectorsStr.split(',').map(sector => sector.trim().toUpperCase());
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



export const formatEmploymentPeriod = (periodStr) => {
    const patterns = [
        { pattern: /(\d+)\s*(months?|years?)/, handler: (match) => ({ number: parseInt(match[1]), scale: match[2].toLowerCase() }) },
        { pattern: /Till (the )?end (of )?(\w+ \d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        { pattern: /(\d+)\s+Months/, handler: (match) => ({ number: parseInt(match[1]), scale: 'months' }) },
        { pattern: /(\d+) (months?|years?) From (\w+ \d{1,2}(st|nd|rd|th)?, \d{4}) till (\w+ \d{1,2}(st|nd|rd|th)?, \d{4})/, handler: (match) => ({ number: parseInt(match[1]), scale: match[2].toLowerCase() }) },
        { pattern: /Until (\d{1,2} \w+ \d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        { pattern: /(\d{1,2}) ([A-Za-z]+), (\d{4}) - (\d{1,2}) ([A-Za-z]+), (\d{4})/, handler: () => ({ number: 0, scale: 'unknown' }) },
        { pattern: /Permanent/, handler: () => ({ number: 0, scale: 'permanent' }) }
    ];

    for (let { pattern, handler } of patterns) {
        const match = periodStr.match(pattern);
        if (match) {
            return handler(match);
        }
    }

    return { number: 0, scale: 'unknown' };
};

//formatting without my array
export function formatString(locationStr){

 // Use a regular expression to add spaces before capitalized words
  let formattedStr = locationStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Use a regular expression to add spaces after special characters (like ‘) if followed by a letter
  formattedStr = formattedStr.replace(/([‘])([A-Za-z])/g, '$1 $2');
  
  // Ensure consistent spacing by splitting and joining the string
  formattedStr = formattedStr.split(' ').join(' ');
  
  return formattedStr;

}


//location format belong my array
export function splitLocationString(inputStr){
    const structure = {
        eng: {
            countries: {
                lebanon: {
                    governates: ["beirut", "mount lebanon", "north lebanon", "akkar", "bekaa", "baalbek-hermel", "south lebanon", "nabatieh","beqaa"],
                    caza: ["beirut", "tripoli", "zgharta", "koura", "bsharre", "batroun", "hermel", "baalbek", "byblos (jbeil)", "keserwan", "matn",
                        "baabda", "aley", "chouf", "zahleh", "western Beqaa", "rachaya", "sidon", "jezzine", "tyre", "nabatiyeh", "hasbaya", "marjaayoun", "bint Jbeil"]
                },
                iraq: {},
                jordan: {},
                syria: {},
                pakistan: {},
                egypt: {},
                qatar: {},
                morocco: {},
                kenya: {},
                france: {}
            }
        },
        ara: {
            المناطق: {
                لبنان: {
                    محافظة: ["عكار", "الشمال", "بعلبك-الهرمل", "بيروت", "جبل لبنان", "البقاع", "الجنوب", "النبطية"],
                    قضاء: ["عكار", "المنية-الضنية", "طرابلس", "زغرتا", "الكورة", "بشري", "البترون", "الهرمل", "بعلبك", "بيروت", "جبيل", "كسروان", "المتن", "بعبدا", "عالية", "الشوف", "زحلة", "البقاع الغربي", "راشَيا", "صيدا", "جزين", "صور", "النبطية", "حاصبيا", "مرجعيون", "بنت جبيل"]
                },
                العراق: {},
                المغرب: {},
                الاردن: {},
                الباكستان: {},
                مصر: {},
                قطر: {},
                سوريا: {},
                فرنسا: {},
                كينيا: {}
            }
        }
    };

    // const matches = [];

    // // Normalize the input for consistent matching
    // const normalizedInput = inputStr.toLowerCase();

    // // Check countries in English structure
    // for (const country in structure.eng.countries) {
    //     if (normalizedInput.includes(country)) {
    //         matches.push(country);
    //     }

    //     // Check cities in English structure
    //     for (const city of structure.eng.countries[country].cities || []) {
    //         if (normalizedInput.includes(city)) {
    //             matches.push(city);
    //         }
    //     }

    //     // Check governates in English structure
    //     for (const governate of structure.eng.countries[country].governates || []) {
    //         if (normalizedInput.includes(governate)) {
    //             matches.push(governate);
    //         }
    //     }
    // }

    // // Check countries in Arabic structure
    // for (const country in structure.ara.المناطق) {
    //     if (normalizedInput.includes(country)) {
    //         matches.push(country);
    //     }

    //     // Check محافظة in Arabic structure
    //     for (const governate of structure.ara.المناطق[country].محافظة || []) {
    //         if (normalizedInput.includes(governate)) {
    //             matches.push(governate);
    //         }
    //     }

    //     // Check قضاء in Arabic structure
    //     for (const qadaa of structure.ara.المناطق[country].قضاء || []) {
    //         if (normalizedInput.includes(qadaa)) {
    //             matches.push(qadaa);
    //         }
    //     }
    // }

    // return matches;


       const matchesSet = new Set();

    // Normalize the input for consistent matching
    const normalizedInput = inputStr.toLowerCase();

    // Check countries in English structure
    for (const country in structure.eng.countries) {
        if (normalizedInput.includes(country)) {
            matchesSet.add(country);
        }

        // Check caza in English structure
        for (const city of structure.eng.countries[country].caza || []) {
            if (normalizedInput.includes(city)) {
                matchesSet.add(city);
            }
        }

        // Check governates in English structure
        for (const governate of structure.eng.countries[country].governates || []) {
            if (normalizedInput.includes(governate)) {
                matchesSet.add(governate);
            }
        }
    }

    // Check countries in Arabic structure
    for (const country in structure.ara.المناطق) {
        if (normalizedInput.includes(country)) {
            matchesSet.add(country);
        }

        // Check محافظة in Arabic structure
        for (const governate of structure.ara.المناطق[country].محافظة || []) {
            if (normalizedInput.includes(governate)) {
                matchesSet.add(governate);
            }
        }

        // Check قضاء in Arabic structure
        for (const qadaa of structure.ara.المناطق[country].قضاء || []) {
            if (normalizedInput.includes(qadaa)) {
                matchesSet.add(qadaa);
            }
        }
    }

    // Convert set to array and return
    return Array.from(matchesSet);

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
    return Array.from(matchesSet);}
