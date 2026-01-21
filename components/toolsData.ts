export interface ToolItem {
  title: string;
  slug: string;
  category: string;
  popular?: boolean;

  description: string;
  seoTitleTemplate: string;
  seoDescriptionTemplate: string;
  
  faqs?: { q: string; a: string }[];
  howtoSteps?: string[];

}



export const toolsData: ToolItem[] = [
  // ============================
// TIME & AGE TOOLS
// ============================

{
  title: "Age Calculator",
  slug: "age-calculator",
  category: "Time and Age Tools",
  popular: true,
  description: "Calculate your exact age in years, months, days, hours, and minutes instantly.",
  seoTitleTemplate: "Age Calculator — Calculate Exact Age Online",
  seoDescriptionTemplate: "Use this free Age Calculator to find your exact age in years, months, days, and more. Fast, accurate, and mobile-friendly.",   // <-- COMMA HERE

  faqs: [
    {
      q: "How does the Age Calculator work?",
      a: "The Age Calculator determines your exact age by comparing your birth date with the current date, providing results in years, months, days, hours and minutes."
    },
    {
      q: "Is the Age Calculator accurate?",
      a: "Yes, it uses precise date and time calculations, including leap years, to provide highly accurate age results."
    },
    {
      q: "Can I calculate someone else’s age?",
      a: "Yes, simply enter any valid date of birth to calculate the age of any person."
    }
  ],
  howtoSteps: [
  "Select your date of birth from the calendar.",
  "Click the Calculate button.",
  "View your age in years, months, days, hours and minutes."
]

},


{
  title: "Age in Weeks & Months",
  slug: "age-weeks-months",
  category: "Time and Age Tools",
  description: "Convert your age into weeks and months instantly with accurate results.",
  seoTitleTemplate: "Age in Weeks & Months — Convert Age Instantly",
  seoDescriptionTemplate: "Calculate your age in total weeks and months with this free online tool. Simple, fast, and perfect for parents, students, and planners.",

faqs: [
  {
    q: "What does the Age in Weeks & Months tool calculate?",
    a: "This tool converts your age into total weeks and total months, offering an alternative way to understand age duration."
  },
  {
    q: "Who uses age in weeks or months?",
    a: "It is commonly used by parents tracking baby growth, health professionals, and planners who need precise age intervals."
  }
],
howtoSteps: [
  "Enter your date of birth.",
  "Click the Calculate button.",
  "See your age displayed in total weeks and total months."
]


},

{
  title: "Age Difference Calculator",
  slug: "age-difference",
  category: "Time and Age Tools",
  description: "Calculate the exact age difference between two people or dates.",
  seoTitleTemplate: "Age Difference Calculator — Compare Ages Easily",
  seoDescriptionTemplate: "Find the exact age difference between two dates instantly. Ideal for relationships, documentation, and planning.",

  faqs: [
  {
    q: "What does the Age Difference Calculator do?",
    a: "It calculates the exact age difference between two dates, showing results in years, months and days."
  },
  {
    q: "Can I use it to compare ages of two people?",
    a: "Yes, simply enter the birth dates of both individuals to get the precise age difference."
  }
],

howtoSteps: [
  "Enter the first date of birth.",
  "Enter the second date of birth.",
  "Click Calculate to view the exact age difference in years, months and days."
]


},
{
  title: "Weeks Calculator",
  slug: "weeks-calculator",
  category: "Time and Age Tools",
  description: "Convert dates to weeks and calculate weeks between dates instantly.",
  seoTitleTemplate: "{title} — Weeks Between Dates Calculator",
  seoDescriptionTemplate: "Use {title} to calculate weeks between two dates or convert days to weeks. Fast and accurate.",
  faqs: [],
  howtoSteps: ["Pick start and end dates.", "Click calculate.", "View weeks result."]
},

{
  title: "Time Duration Calculator",
  slug: "time-duration",
  category: "Time and Age Tools",
  description: "Calculate the duration between two times accurately.",
  seoTitleTemplate: "Time Duration Calculator — Calculate Time Between Two Times",
  seoDescriptionTemplate: "Calculate time duration between any two times with this fast and accurate tool. Converts hours, minutes, and seconds instantly.",
  faqs: [
  {
    q: "How does the Time Duration Calculator work?",
    a: "It calculates the time difference between two specific times, showing results in hours, minutes and seconds."
  },
  {
    q: "Where is a time duration calculator useful?",
    a: "It’s helpful for work logs, time tracking, event planning, and calculating the duration of activities."
  }
],

howtoSteps: [
  "Enter the start time.",
  "Enter the end time.",
  "Click Calculate to see the time difference in hours, minutes and seconds."
]


},

{
  title: "Days Between Dates",
  slug: "days-between-dates",
  category: "Time and Age Tools",
  description: "Find the number of days between two calendar dates.",
  seoTitleTemplate: "Days Between Dates — Calculate Days Difference",
  seoDescriptionTemplate: "Calculate the number of days between two dates instantly. Perfect for planning events, deadlines, and schedules.",
  faqs: [
  {
    q: "How is the number of days between two dates calculated?",
    a: "The calculator subtracts the earlier date from the later date, returning the exact number of days between them."
  },
  {
    q: "Does it consider leap years?",
    a: "Yes, the calculation automatically includes leap years and all calendar adjustments."
  }
],
howtoSteps: [
  "Select the start date.",
  "Select the end date.",
  "Click Calculate to view the exact number of days between both dates."
]


},

{
  title: "Days Until Calculator",
  slug: "days-until",
  category: "Time and Age Tools",
  description: "Calculate how many days remain until a future date.",
  seoTitleTemplate: "Days Until Calculator — Count Days Until Any Date",
  seoDescriptionTemplate: "Find out how many days are left until any event or date. Ideal for countdowns and important reminders.",

  faqs: [
  {
    q: "What does the Days Until Calculator show?",
    a: "It calculates how many days are left until a future event or date you enter."
  },
  {
    q: "Is it useful for countdowns?",
    a: "Yes, it is perfect for tracking upcoming events, deadlines, birthdays or travel dates."
  }
],
howtoSteps: [
  "Select a future date from the calendar.",
  "Click the Calculate button.",
  "Check how many days are left until that date."
]


},

{
  title: "Future Date Calculator",
  slug: "future-date",
  category: "Time and Age Tools",
  description: "Add days, weeks, months or years to any date to find a future date.",
  seoTitleTemplate: "Future Date Calculator — Add Days to Date",
  seoDescriptionTemplate: "Calculate future dates easily by adding days, weeks, months, or years. Great for planning and scheduling.",

  faqs: [
  {
    q: "How do I calculate a future date?",
    a: "Enter any date and specify the number of days, weeks, months or years to add. The tool computes the exact future date instantly."
  },
  {
    q: "Does it adjust for calendar variations?",
    a: "Yes, it accounts for leap years and varying month lengths automatically."
  }
],

howtoSteps: [
  "Choose a starting date.",
  "Enter how many days, weeks, months or years to add.",
  "Click Calculate to get your future date."
]


},

{
  title: "Past Date Calculator",
  slug: "past-date",
  category: "Time and Age Tools",
  description: "Subtract days, weeks, months or years to find a past date.",
  seoTitleTemplate: "Past Date Calculator — Subtract Days from Date",
  seoDescriptionTemplate: "Find past dates by subtracting days, weeks, months, or years. Fast and reliable for documentation and planning.",

  faqs: [
  {
    q: "What does the Past Date Calculator do?",
    a: "It subtracts days, weeks, months or years from a starting date to calculate an exact past date."
  },
  {
    q: "Are leap years handled correctly?",
    a: "Yes, the tool uses precise date logic and automatically includes leap year adjustments."
  }
],

howtoSteps: [
  "Select a starting date.",
  "Enter the number of days, weeks, months or years to subtract.",
  "Click Calculate to see the past date."
]


},

  // ============================
// FINANCE TOOLS
// ============================

{
  title: "Loan Calculator",
  slug: "loan-calculator",
  category: "Finance Tools",
  popular: true,
  description: "Calculate EMI, interest cost, total payment, and loan amortization instantly.",
  seoTitleTemplate: "Loan Calculator — EMI, Interest & Total Cost",
  seoDescriptionTemplate: "Use this free Loan Calculator to estimate EMI, interest charges, and total loan cost. Fast, accurate and perfect for mortgages, personal loans and car loans.",

  faqs: [
  {
    q: "How does the Loan Calculator work?",
    a: "The Loan Calculator uses the standard EMI formula to compute your monthly installment, total payment, and total interest based on loan amount, tenure and interest rate."
  },
  {
    q: "Is my EMI calculation accurate?",
    a: "Yes, the results follow globally accepted amortization principles and are accurate for all loan types including home, car and personal loans."
  },
  {
    q: "Can I compare different loan options?",
    a: "Yes, you can change the loan amount, interest rate and tenure to instantly compare different EMI outcomes."
  }
],

howtoSteps: [
  "Enter the loan amount you want to borrow.",
  "Enter the annual interest rate.",
  "Choose the loan tenure in months or years.",
  "Click Calculate to view EMI, interest cost and total payment."
]


},

{
  title: "Simple Interest Calculator",
  slug: "simple-interest-calculator",
  category: "Finance Tools",
  description: "Calculate simple interest, total amount, and profit instantly.",
  seoTitleTemplate: "{title} — Simple Interest Calculator",
  seoDescriptionTemplate: "Use {title} to calculate simple interest and total return. Fast and accurate.",
  faqs: [],
  howtoSteps: ["Enter principal, rate, and time.", "Click calculate.", "View interest and total amount."]
},
{
  title: "Mortgage Calculator",
  slug: "mortgage-calculator",
  category: "Finance Tools",
  description: "Estimate your monthly mortgage payments including principal, interest, taxes and insurance.",
  seoTitleTemplate: "Mortgage Calculator — Estimate Monthly Payments",
  seoDescriptionTemplate: "Calculate your mortgage payments with interest, taxes and insurance included. Get instant amortization schedules with this free tool."
,
faqs: [
  {
    q: "What does the Mortgage Calculator do?",
    a: "It estimates your monthly mortgage payment including principal, interest, property tax and insurance based on standard amortization formulas."
  },
  {
    q: "Are property taxes included?",
    a: "Yes, you can optionally include taxes and insurance to get a more realistic monthly mortgage estimate."
  },
  {
    q: "Is the mortgage calculation reliable?",
    a: "Yes, it uses industry-standard mortgage formulas used by banks and lenders."
  }
],
howtoSteps: [
  "Enter the home price or mortgage amount.",
  "Enter the annual interest rate.",
  "Enter the loan tenure in years.",
  "Add property tax and insurance if needed.",
  "Click Calculate to see monthly mortgage payments."
]


},

{
  title: "Interest Rate Calculator",
  slug: "interest-rate-calculator",
  category: "Finance Tools",
  description: "Calculate interest rate based on principal, time and total amount.",
  seoTitleTemplate: "Interest Rate Calculator — Find Interest Easily",
  seoDescriptionTemplate: "Compute interest rate using principal, duration and final amount instantly. Ideal for loans, savings and investment analysis."
,
faqs: [
  {
    q: "How does the Interest Rate Calculator work?",
    a: "It calculates the effective interest rate when you provide the principal amount, total payable amount and time duration."
  },
  {
    q: "Can I use it for both loans and savings?",
    a: "Yes, it works for loans, fixed deposits, savings accounts and investment comparisons."
  }
],
howtoSteps: [
  "Enter the principal amount.",
  "Enter the total amount payable.",
  "Enter the time duration.",
  "Click Calculate to see your effective interest rate."
]


},

{
  title: "EMI Calculator",
  slug: "emi-calculator",
  category: "Finance Tools",
  description: "Calculate monthly EMI for home, car, or personal loans within seconds.",
  seoTitleTemplate: "EMI Calculator — Monthly Loan Payment Tool",
  seoDescriptionTemplate: "Calculate EMI for mortgages, car loans and personal loans instantly. Provides interest breakdown and amortization details."
,
faqs: [
  {
    q: "What is an EMI?",
    a: "EMI stands for Equated Monthly Installment. It is the fixed payment you make each month for a loan."
  },
  {
    q: "How is EMI calculated?",
    a: "The EMI is calculated using principal amount, annual interest rate and loan tenure through a standard EMI formula."
  },
  {
    q: "Does this work for all loan types?",
    a: "Yes, it works for car loans, home loans, personal loans and educational loans."
  }
],
howtoSteps: [
  "Enter the loan amount.",
  "Enter the interest rate.",
  "Enter the loan tenure.",
  "Click Calculate to get your EMI, interest and total payment."
]


},

{
  title: "Compound Interest Calculator",
  slug: "compound-interest-calculator",
  category: "Finance Tools",
  description: "Calculate compound interest on savings and investments with flexible compounding periods.",
  seoTitleTemplate: "Compound Interest Calculator — Investment Growth Tool",
  seoDescriptionTemplate: "Estimate compound interest growth on your investments. Supports annual, monthly and daily compounding for accurate results."
,
faqs: [
  {
    q: "What is compound interest?",
    a: "Compound interest is the interest calculated on the initial principal plus accumulated interest from previous periods."
  },
  {
    q: "Does this tool support monthly and yearly compounding?",
    a: "Yes, you can choose annual, monthly or even daily compounding for accurate growth projections."
  }
],
howtoSteps: [
  "Enter the principal investment amount.",
  "Enter the interest rate.",
  "Choose the compounding frequency (annual, monthly or daily).",
  "Enter the number of years.",
  "Click Calculate to view your investment growth."
]


},

{
  title: "SIP Calculator",
  slug: "sip-calculator",
  category: "Finance Tools",
  description: "Calculate SIP returns based on monthly investment, duration and expected rate.",
  seoTitleTemplate: "SIP Calculator — Mutual Fund Return Estimator",
  seoDescriptionTemplate: "Use this free SIP Calculator to estimate long-term mutual fund returns. Perfect for investment planning and wealth building."
,
faqs: [
  {
    q: "How does the SIP Calculator estimate returns?",
    a: "It uses the compound interest formula and monthly contributions to find total investment value and expected returns."
  },
  {
    q: "Is SIP return guaranteed?",
    a: "No, SIP returns are market-linked and depend on mutual fund performance. The calculator provides an estimate only."
  }
],
howtoSteps: [
  "Enter your monthly SIP amount.",
  "Enter the expected annual return rate.",
  "Enter the duration in years.",
  "Click Calculate to see total investment and expected returns."
]


},

{
  title: "Currency Converter",
  slug: "currency-converter",
  category: "Finance Tools",
  popular: true,
  description: "Convert between world currencies using real-time exchange rates.",
  seoTitleTemplate: "Currency Converter — Live Exchange Rates",
  seoDescriptionTemplate: "Convert world currencies instantly using live exchange rates. Fast, accurate and easy to use for travelers and businesses."
,
faqs: [
  {
    q: "How accurate are the currency rates?",
    a: "The converter uses frequently updated global exchange rates to ensure accuracy for most currency conversions."
  },
  {
    q: "Can I convert multiple currencies?",
    a: "Yes, you can convert between any supported global currencies instantly."
  }
],
howtoSteps: [
  "Choose the currency you want to convert from.",
  "Choose the currency you want to convert to.",
  "Enter the amount.",
  "Click Convert to see the converted value."
]


},

{
  title: "Salary to Hourly Calculator",
  slug: "salary-to-hourly-calculator",
  category: "Finance Tools",
  description: "Convert annual salary into hourly, weekly and monthly earnings.",
  seoTitleTemplate: "Salary to Hourly Calculator — Income Conversion Tool",
  seoDescriptionTemplate: "Convert salary to hourly, weekly or monthly income instantly. Useful for job offers, freelancers, and paycheck comparisons."
,
faqs: [
  {
    q: "How is salary converted to hourly rate?",
    a: "The calculator divides your annual salary by total yearly working hours to estimate your hourly earnings."
  },
  {
    q: "Can I convert hourly to salary?",
    a: "Yes, simply reverse the values by entering hourly income and working hours to estimate annual salary."
  }
],
howtoSteps: [
  "Enter your annual salary or monthly salary.",
  "Select your working hours per week.",
  "Click Calculate to get your hourly, weekly and monthly earnings."
]


},

{
  title: "Global Tax Calculator",
  slug: "global-tax-calculator",
  category: "Finance Tools",
  description: "Estimate income tax based on country-specific tax brackets and rules.",
  seoTitleTemplate: "Global Tax Calculator — Country-Wise Income Tax",
  seoDescriptionTemplate: "Calculate income tax for any country using updated tax brackets. Perfect for expats, freelancers and global workers."
,
faqs: [
  {
    q: "How does the Global Tax Calculator work?",
    a: "It estimates your income tax based on the selected country's tax brackets and your annual salary."
  },
  {
    q: "Are tax rates updated?",
    a: "Yes, the calculator uses commonly referenced tax brackets. However, always confirm with official sources."
  }
],
howtoSteps: [
  "Select your country.",
  "Enter your annual income.",
  "Click Calculate to estimate your income tax based on current tax brackets."
]


},

{
  title: "Investment Return Calculator",
  slug: "investment-return-calculator",
  category: "Finance Tools",
  description: "Calculate your investment returns based on principal, rate and duration.",
  seoTitleTemplate: "Investment Return Calculator — ROI Estimator",
  seoDescriptionTemplate: "Estimate investment returns and total profit using principal, interest rate and duration. Great for comparing ROI options."
,
faqs: [
  {
    q: "What does the Investment Return Calculator do?",
    a: "It calculates your total return, interest earned and final investment value using principal, growth rate and duration."
  },
  {
    q: "Can I compare different ROI scenarios?",
    a: "Yes, you can change interest rates and durations to compare various investment outcomes."
  }
],
howtoSteps: [
  "Enter the principal investment amount.",
  "Enter the expected annual return rate.",
  "Enter the duration of the investment.",
  "Click Calculate to view total returns and final value."
]


},

  // ============================
// TEXT TOOLS
// ============================

{
  title: "Word Counter",
  slug: "word-counter",
  category: "Text Tools",
  popular: true,
  description: "Count words, characters, sentences and paragraphs instantly.",
  seoTitleTemplate: "Word Counter — Count Words & Characters Online",
  seoDescriptionTemplate: "Use this free Word Counter to count words, characters, sentences and paragraphs instantly. Ideal for writers, students and SEO experts."
,
faqs: [
  {
    q: "What does the Word Counter tool do?",
    a: "The Word Counter counts words, characters, sentences and paragraphs instantly as you type or paste text."
  },
  {
    q: "Is the Word Counter accurate?",
    a: "Yes, it uses real-time text analysis to provide accurate counts for all text elements."
  }
],
howtoSteps: [
  "Type or paste your text into the input box.",
  "View the word, character, sentence and paragraph counts instantly.",
  "Copy or export the results if needed."
]


},

{
  title: "Character Counter",
  slug: "character-counter",
  category: "Text Tools",
  description: "Count characters with or without spaces in real time.",
  seoTitleTemplate: "Character Counter — Count Characters Instantly",
  seoDescriptionTemplate: "Count characters with or without spaces instantly using this free Character Counter. Perfect for social media limits and SEO optimization."
,
faqs: [
  {
    q: "What is a Character Counter used for?",
    a: "A Character Counter measures the number of characters with or without spaces, useful for social media limits, essays and SEO."
  },
  {
    q: "Does it count emojis?",
    a: "Yes, emojis and symbols are counted as characters as well."
  }
],
howtoSteps: [
  "Paste or type your text into the box.",
  "See character counts update automatically.",
  "Check counts with and without spaces if required."
]


},

{
  title: "Case Converter",
  slug: "case-converter",
  category: "Text Tools",
  description: "Convert text between uppercase, lowercase, sentence case and more.",
  seoTitleTemplate: "Case Converter — Convert Text Case Online",
  seoDescriptionTemplate: "Convert text to uppercase, lowercase, title case, sentence case and more with this fast and easy Case Converter tool."
,
faqs: [
  {
    q: "What can I do with the Case Converter?",
    a: "You can convert text into uppercase, lowercase, sentence case, title case and other formatting styles instantly."
  },
  {
    q: "Does the Case Converter support long text?",
    a: "Yes, it can convert text of any length instantly without slowing down."
  }
],
howtoSteps: [
  "Paste your text into the input area.",
  "Choose the case format you want (uppercase, lowercase, title case, sentence case).",
  "Copy the converted text."
]


},

{
  title: "Remove Extra Spaces",
  slug: "remove-extra-spaces",
  category: "Text Tools",
  description: "Clean and remove extra spaces from text automatically.",
  seoTitleTemplate: "Remove Extra Spaces — Clean Text Instantly",
  seoDescriptionTemplate: "Remove unnecessary spaces from text instantly. Perfect for formatting, cleaning documents and improving readability."
,
faqs: [
  {
    q: "What does the Remove Extra Spaces tool do?",
    a: "It automatically removes double spaces, leading spaces and trailing spaces from text to make it clean and readable."
  },
  {
    q: "Will it affect the original meaning of text?",
    a: "No, only unnecessary spaces are removed. All words and sentences remain unchanged."
  }
],
howtoSteps: [
  "Paste your text into the input box.",
  "Click the Remove Extra Spaces button.",
  "Copy the cleaned text with normalized spacing."
]


},

{
  title: "Remove Line Breaks",
  slug: "remove-line-breaks",
  category: "Text Tools",
  description: "Remove line breaks, newlines and paragraph spacing with one click.",
  seoTitleTemplate: "Remove Line Breaks — Clean Text Formatting",
  seoDescriptionTemplate: "Remove newlines and line breaks from text instantly. Ideal for merging text, formatting emails, and fixing copied content."
,
faqs: [
  {
    q: "Why use a Remove Line Breaks tool?",
    a: "It merges multiple lines into a single paragraph by removing newline characters."
  },
  {
    q: "Can I format text after removing line breaks?",
    a: "Yes, you can reformat or copy the cleaned text anywhere you need."
  }
],
howtoSteps: [
  "Paste the text you want to clean.",
  "Select the format you prefer (merge lines or remove breaks).",
  "Click Convert to generate text without line breaks."
]


},

{
  title: "Text Reverser",
  slug: "text-reverser",
  category: "Text Tools",
  description: "Reverse text, words or sentences with a single click.",
  seoTitleTemplate: "Text Reverser — Reverse Text Online",
  seoDescriptionTemplate: "Reverse text instantly by characters, words or full sentences. A simple and fast tool for creative and technical use."
,
faqs: [
  {
    q: "What does the Text Reverser do?",
    a: "It reverses text direction by characters, words or complete sentences with one click."
  },
  {
    q: "Is it useful for coding or cryptography?",
    a: "Yes, developers often use it for testing, debugging and creating reversed output."
  }
],
howtoSteps: [
  "Enter or paste text into the textbox.",
  "Select whether to reverse characters, words or sentences.",
  "Click Reverse to see the output."
]


},

{
  title: "Remove Duplicate Lines",
  slug: "remove-duplicate-lines",
  category: "Text Tools",
  description: "Remove duplicate lines from text while keeping unique entries.",
  seoTitleTemplate: "Remove Duplicate Lines — Clean Duplicate Text",
  seoDescriptionTemplate: "Remove duplicate lines from any text instantly. Great for cleaning lists, logs, and SEO keyword files."
,
faqs: [
  {
    q: "What is the purpose of the Remove Duplicate Lines tool?",
    a: "It removes repeated lines from your text to create a clean list of unique items."
  },
  {
    q: "Does it preserve line order?",
    a: "Yes, the tool keeps the original order of lines while removing duplicates."
  }
],
howtoSteps: [
  "Paste your list or text into the box.",
  "Click Remove Duplicate Lines.",
  "Copy the cleaned text with unique lines only."
]


},

{
  title: "Find & Replace",
  slug: "find-and-replace",
  category: "Text Tools",
  description: "Search and replace text patterns quickly and accurately.",
  seoTitleTemplate: "Find & Replace — Search and Replace Text Online",
  seoDescriptionTemplate: "Find and replace text strings instantly with this free online tool. Supports simple and advanced replacements."
,
faqs: [
  {
    q: "How does the Find & Replace tool work?",
    a: "It searches text for a specific word or phrase and replaces it with your chosen alternative instantly."
  },
  {
    q: "Does it support replacing multiple terms?",
    a: "Yes, simply perform multiple replacements one after another."
  }
],
howtoSteps: [
  "Paste the text you want to edit.",
  "Enter the word or phrase to find.",
  "Enter the replacement text.",
  "Click Replace to update all matches."
]


},

{
  title: "Capitalize Sentences",
  slug: "capitalize-sentences",
  category: "Text Tools",
  description: "Automatically capitalize the first letter of every sentence.",
  seoTitleTemplate: "Capitalize Sentences — Auto Sentence Capitalization",
  seoDescriptionTemplate: "Automatically capitalize each sentence in your text. A perfect tool for formatting essays, documents and blog posts."
,
faqs: [
  {
    q: "What is the Capitalize Sentences tool used for?",
    a: "It automatically capitalizes the first letter of each sentence in your text."
  },
  {
    q: "Does it change any other text formatting?",
    a: "No, punctuation and words remain unchanged except for sentence capitalization."
  }
],
howtoSteps: [
  "Paste your text into the input field.",
  "Click Capitalize Sentences.",
  "Copy the formatted text with proper capitalization."
]


},

{
  title: "Text Sorter",
  slug: "text-sorter",
  category: "Text Tools",
  description: "Sort lines of text alphabetically, numerically or randomly.",
  seoTitleTemplate: "Text Sorter — Sort Lines Alphabetically or Randomly",
  seoDescriptionTemplate: "Sort text lines alphabetically, numerically or randomly with this fast online Text Sorter."
,
faqs: [
  {
    q: "What can I do with the Text Sorter?",
    a: "You can sort text lines alphabetically, reverse alphabetically, numerically or randomly."
  },
  {
    q: "Does it change the content of lines?",
    a: "Only the order of lines changes; the content stays the same."
  }
],
howtoSteps: [
  "Paste your text or list into the input box.",
  "Choose a sorting option (A→Z, Z→A, numeric or random).",
  "Click Sort to reorder the lines."
]


},

{
  title: "Lorem Ipsum Generator",
  slug: "lorem-ipsum-generator",
  category: "Text Tools",
  description: "Generate lorem ipsum placeholder text instantly.",
  seoTitleTemplate: "Lorem Ipsum Generator — Generate Dummy Text",
  seoDescriptionTemplate: "Generate lorem ipsum placeholder text instantly for design, development and content layout testing."
,
faqs: [
  {
    q: "What does the Lorem Ipsum Generator create?",
    a: "It generates placeholder dummy text used for design, testing and content layouts."
  },
  {
    q: "Can I choose the amount of text?",
    a: "Yes, you can generate as many paragraphs, words or characters as you want."
  }
],
howtoSteps: [
  "Choose how many paragraphs, words or characters you want.",
  "Click Generate to create lorem ipsum text.",
  "Copy or use the placeholder text in your projects."
]


},

{
  title: "Keyword Density Analyzer",
  slug: "keyword-density-analyzer",
  category: "Text Tools",
  description: "Analyze keyword frequency and density in any text.",
  seoTitleTemplate: "Keyword Density Analyzer — SEO Keyword Tool",
  seoDescriptionTemplate: "Analyze keyword density, frequency and word usage with this SEO-friendly Keyword Density Analyzer."
,
faqs: [
  {
    q: "What does the Keyword Density Analyzer do?",
    a: "It analyzes your text to measure keyword frequency and density for SEO optimization."
  },
  {
    q: "Is this tool useful for SEO?",
    a: "Yes, it helps writers and SEO professionals check keyword stuffing and maintain optimal keyword balance."
  }
],
howtoSteps: [
  "Paste your text into the input box.",
  "Click Analyze to calculate keyword frequency and density.",
  "Review the results for SEO optimization."
]


},

{
  title: "Character Frequency Counter",
  slug: "character-frequency-counter",
  category: "Text Tools",
  description: "Count how many times each character appears in text.",
  seoTitleTemplate: "Character Frequency Counter — Analyze Character Usage",
  seoDescriptionTemplate: "Count character frequency in any text instantly. Ideal for cryptography, statistics and text analysis."
,
faqs: [
  {
    q: "What is the purpose of the Character Frequency Counter?",
    a: "It counts how many times each character appears in your text, including letters, numbers and symbols."
  },
  {
    q: "Who uses this tool?",
    a: "Students, linguists, developers and cryptography enthusiasts use it for analysis."
  }
],
howtoSteps: [
  "Paste text into the input field.",
  "Click Analyze to see how many times each character appears.",
  "Use the results for text analysis or cryptography."
]


},

{
  title: "Slug Generator",
  slug: "slug-generator",
  category: "Text Tools",
  description: "Generate clean, SEO-friendly URL slugs instantly.",
  seoTitleTemplate: "Slug Generator — Create SEO-Friendly URLs",
  seoDescriptionTemplate: "Generate SEO-friendly URL slugs instantly. Perfect for blogs, websites and content management."
,
faqs: [
  {
    q: "What is the Slug Generator used for?",
    a: "It converts any text into a clean, SEO-friendly URL slug by removing spaces and special characters."
  },
  {
    q: "Are the generated slugs SEO-friendly?",
    a: "Yes, all slugs are formatted according to SEO best practices for URLs."
  }
],
howtoSteps: [
  "Enter any text or title into the input box.",
  "Click Generate to create an SEO-friendly slug.",
  "Copy the slug for URLs, blogs or websites."
]


},

  // ============================
// IMAGE TOOLS
// ============================

{
  title: "Image Compressor",
  slug: "image-compressor",
  category: "Image Tools",
  popular: true,
  description: "Compress images without losing quality and reduce file size instantly.",
  seoTitleTemplate: "Image Compressor — Compress Images Without Quality Loss",
  seoDescriptionTemplate: "Compress images online without losing quality. Reduce file size instantly for websites, emails, and social media."
,
faqs: [
  {
    q: "How does the Image Compressor work?",
    a: "The Image Compressor reduces file size by optimizing image data while maintaining visual quality."
  },
  {
    q: "Will compressing an image reduce quality?",
    a: "No, the tool uses smart compression to reduce file size without noticeable quality loss."
  }
],
howtoSteps: [
  "Upload the image you want to compress.",
  "Choose your desired compression level.",
  "Click Compress to reduce the file size.",
  "Download the optimized image."
]


},

{
  title: "Image Resizer",
  slug: "image-resizer",
  category: "Image Tools",
  description: "Resize images to custom dimensions or preset sizes in seconds.",
  seoTitleTemplate: "Image Resizer — Resize Images Online",
  seoDescriptionTemplate: "Resize images to any width or height instantly. Fast, free, and perfect for web, print, and social media."
,
faqs: [
  {
    q: "What can I do with the Image Resizer?",
    a: "You can resize any image to custom dimensions or preset aspect ratios in seconds."
  },
  {
    q: "Does resizing affect image quality?",
    a: "Only minimal quality changes occur, and the tool preserves as much clarity as possible."
  }
],
howtoSteps: [
  "Upload your image.",
  "Enter new width and height or choose a preset size.",
  "Click Resize to apply the new dimensions.",
  "Download your resized image."
]


},

{
  title: "Image Cropper",
  slug: "image-cropper",
  category: "Image Tools",
  description: "Crop images to any size or aspect ratio quickly and easily.",
  seoTitleTemplate: "Image Cropper — Crop Images Online",
  seoDescriptionTemplate: "Crop images to custom dimensions or fixed aspect ratios instantly. Ideal for profile photos, social media posts, and banners."
,
faqs: [
  {
    q: "How do I crop an image?",
    a: "Upload an image, select the area you want to keep, and crop it instantly with one click."
  },
  {
    q: "Which image formats are supported?",
    a: "PNG, JPG, WEBP and most standard image formats are supported."
  }
],
howtoSteps: [
  "Upload an image to the tool.",
  "Select the area you want to keep by dragging the crop box.",
  "Click Crop to cut out the selected portion.",
  "Download the cropped image."
]


},

{
  title: "Image Blur Tool",
  slug: "image-blur",
  category: "Image Tools",
  description: "Blur image backgrounds, faces, or selected areas instantly.",
  seoTitleTemplate: "Image Blur Tool — Blur Images Online",
  seoDescriptionTemplate: "Blur any part of an image instantly. Perfect for hiding sensitive information or creating aesthetic blur effects."
,
faqs: [
  {
    q: "What does the Image Blur Tool do?",
    a: "It allows you to blur backgrounds or specific areas of an image for privacy or creative effect."
  },
  {
    q: "Can I control the blur intensity?",
    a: "Yes, you can adjust the blur strength to achieve your desired effect."
  }
],
howtoSteps: [
  "Upload your image.",
  "Select the blur intensity level.",
  "Apply the blur effect to the full image or a specific area.",
  "Download the blurred image."
]


},

{
  title: "Image Rotate Tool",
  slug: "image-rotate",
  category: "Image Tools",
  description: "Rotate images clockwise, counterclockwise, or flip them effortlessly.",
  seoTitleTemplate: "Image Rotate Tool — Rotate or Flip Images Online",
  seoDescriptionTemplate: "Rotate or flip images instantly. Supports 90°, 180°, 270° rotations and horizontal or vertical flips."
,
faqs: [
  {
    q: "What does the Image Blur Tool do?",
    a: "It allows you to blur backgrounds or specific areas of an image for privacy or creative effect."
  },
  {
    q: "Can I control the blur intensity?",
    a: "Yes, you can adjust the blur strength to achieve your desired effect."
  }
],
howtoSteps: [
  "Upload the image you want to rotate.",
  "Choose a rotation angle (90°, 180°, 270°) or flip option.",
  "Click Rotate to apply changes.",
  "Download the rotated image."
]


},

{
  title: "Image Format Converter",
  slug: "image-format-converter",
  category: "Image Tools",
  description: "Convert images between JPG, PNG, WEBP, GIF and other formats.",
  seoTitleTemplate: "Image Format Converter — Convert Images to JPG, PNG, WEBP",
  seoDescriptionTemplate: "Convert images to JPG, PNG, WEBP, GIF and more instantly. Fast, free and built for high-quality output."
,
faqs: [
  {
    q: "Which formats can I convert images to?",
    a: "You can convert images to JPG, PNG, WEBP, GIF and other popular formats."
  },
  {
    q: "Does converting an image change its quality?",
    a: "Quality remains high unless converting to a format with compression like JPG."
  }
],
howtoSteps: [
  "Upload your image in any supported format.",
  "Select the format you want to convert to (JPG, PNG, WEBP, etc.).",
  "Click Convert to process the image.",
  "Download the converted file."
]


},

{
  title: "Image Color Picker",
  slug: "image-color-picker",
  category: "Image Tools",
  popular: true,
  description: "Pick color codes from any image, including HEX, RGB and HSL.",
  seoTitleTemplate: "Image Color Picker — Extract HEX & RGB From Any Image",
  seoDescriptionTemplate: "Pick any color from an image and get HEX, RGB, and HSL values instantly. Great for designers and developers."
,
faqs: [
  {
    q: "How does the Image Color Picker work?",
    a: "Upload an image and click any point to get the exact HEX, RGB and HSL color values."
  },
  {
    q: "Is this tool useful for designers?",
    a: "Yes, it’s ideal for designers, developers and anyone needing accurate color codes."
  }
],
howtoSteps: [
  "Upload an image.",
  "Click anywhere on the image to pick a color.",
  "View the color code in HEX, RGB and HSL formats.",
  "Copy the color value for your project."
]


},

{
  title: "Image to Base64 Converter",
  slug: "image-to-base64",
  category: "Image Tools",
  description: "Convert images into Base64 encoded strings within seconds.",
  seoTitleTemplate: "Image to Base64 Converter — Convert Images to Base64",
  seoDescriptionTemplate: "Convert images to Base64 encoding instantly for CSS, HTML, and data-URI usage. Secure and fast."
,
faqs: [
  {
    q: "What does the Image to Base64 Converter do?",
    a: "It converts any image into a Base64 encoded string for embedding into CSS, HTML or JSON."
  },
  {
    q: "Is Base64 safe to use?",
    a: "Yes, Base64 is widely used for embedding images without external file hosting."
  }
],
howtoSteps: [
  "Upload the image.",
  "Click Convert to turn the file into Base64 code.",
  "Copy the Base64 output for use in HTML, CSS or JSON."
]


},

{
  title: "Base64 to Image Converter",
  slug: "base64-to-image",
  category: "Image Tools",
  description: "Convert Base64 encoded strings back into downloadable images.",
  seoTitleTemplate: "Base64 to Image Converter — Decode Base64 to Image",
  seoDescriptionTemplate: "Convert Base64 strings back to images instantly. Supports JPG, PNG, WEBP and more."
,
faqs: [
  {
    q: "How do I convert Base64 back to an image?",
    a: "Paste the Base64 string into the tool and it will generate a downloadable image instantly."
  },
  {
    q: "Which image formats are supported?",
    a: "Most Base64-encoded images output as PNG or JPG depending on the original encoding."
  }
],
howtoSteps: [
  "Paste your Base64 code into the input box.",
  "Click Convert to decode it back into an image.",
  "Download the generated image file."
]


},

  // ============================
// SOCIAL MEDIA TOOLS
// ============================
{
  title: "Instagram Bio Generator",
  slug: "instagram-bio-generator",
  category: "Social Media Tools",
  description: "Generate Instagram bio ideas based on your niche and style.",
  seoTitleTemplate: "{title} — Create Instagram Bio Ideas",
  seoDescriptionTemplate: "Use {title} to generate unique Instagram bio ideas instantly. Fast and free.",
  faqs: [],
  howtoSteps: ["Enter niche/keywords.", "Pick style/tone.", "Generate bios and copy."]
},
{
  title: "Instagram Caption Generator",
  slug: "instagram-caption-generator",
  category: "Social Media Tools",
  description: "Generate captions for Instagram posts and reels instantly.",
  seoTitleTemplate: "{title} — Instagram Caption Ideas",
  seoDescriptionTemplate: "Use {title} to generate engaging captions for Instagram content. Free and fast.",
  faqs: [],
  howtoSteps: ["Enter topic/keywords.", "Choose tone.", "Generate captions and copy."]
},
{
  title: "Instagram Fancy Font Generator",
  slug: "instagram-font-generator",
  category: "Social Media Tools",
  description: "Convert text into stylish Instagram-ready fonts.",
  seoTitleTemplate: "{title} — Instagram Fancy Font Generator",
  seoDescriptionTemplate: "Use {title} to generate stylish fonts for Instagram bios, captions and posts.",
  faqs: [],
  howtoSteps: ["Type your text.", "Pick a font style.", "Copy and paste to Instagram."]
},
{
  title: "Open Graph Meta Tag Generator",
  slug: "open-graph-meta-generator",
  category: "Social Media Tools",
  description: "Generate OG meta tags quickly for better link previews.",
  seoTitleTemplate: "{title} — Open Graph Meta Tag Generator",
  seoDescriptionTemplate: "Use {title} to create Open Graph meta tags and improve how your links appear on social platforms.",
  faqs: [],
  howtoSteps: ["Enter title/description/image.", "Generate tags.", "Copy into HTML head."]
},
{
  title: "Social Share Link Builder",
  slug: "social-share-link-builder",
  category: "Social Media Tools",
  description: "Create share links for WhatsApp, Facebook, Twitter/X, LinkedIn and more.",
  seoTitleTemplate: "{title} — Build Social Share Links",
  seoDescriptionTemplate: "Use {title} to generate ready-to-use share URLs for major social platforms.",
  faqs: [],
  howtoSteps: ["Enter your page URL.", "Pick platform.", "Copy generated share link."]
},

{
  title: "TikTok Bio Generator",
  slug: "tiktok-bio-generator",
  category: "Social Media Tools",
  description: "Generate short, catchy TikTok bios using a keyword.",
  seoTitleTemplate: "TikTok Bio Generator — Create Viral TikTok Bios",
  seoDescriptionTemplate: "Create viral TikTok bio ideas instantly using a keyword. Free and easy to use.",
  howtoSteps: [
    "Enter your niche or keyword.",
    "Generate TikTok bio ideas.",
    "Copy and paste into your TikTok profile."
  ]
},

{
  title: "TikTok Caption Generator",
  slug: "tiktok-caption-generator",
  category: "Social Media Tools",
  description: "Generate viral TikTok captions based on your content keyword.",
  seoTitleTemplate: "TikTok Caption Generator — Viral Caption Ideas",
  seoDescriptionTemplate: "Generate trending TikTok captions instantly to boost engagement.",
  howtoSteps: [
    "Enter a keyword related to your video.",
    "Generate captions.",
    "Copy and use in your TikTok post."
  ]
},

{
  title: "TikTok Hashtag Generator",
  slug: "tiktok-hashtag-generator",
  category: "Social Media Tools",
  description: "Generate trending TikTok hashtags for any niche.",
  seoTitleTemplate: "TikTok Hashtag Generator — Trending Hashtags Tool",
  seoDescriptionTemplate: "Generate trending TikTok hashtags to increase reach and visibility.",
  howtoSteps: [
    "Enter your niche or keyword.",
    "Generate hashtag sets.",
    "Copy and paste into your TikTok caption."
  ]
},

{
  title: "Tweet Generator",
  slug: "tweet-generator",
  category: "Social Media Tools",
  description: "Create realistic tweet previews for mockups or fun.",
  seoTitleTemplate: "Tweet Generator — Create Fake Tweet Previews",
  seoDescriptionTemplate: "Generate fake tweet previews for mockups, demos, or social media designs.",
  howtoSteps: [
    "Enter name, username and tweet content.",
    "Customize likes and retweets.",
    "Preview and screenshot the tweet."
  ]
},

{
  title: "Tweet Thread Generator",
  slug: "tweet-thread-generator",
  category: "Social Media Tools",
  description: "Generate structured tweet threads using a keyword.",
  seoTitleTemplate: "Tweet Thread Generator — Create Viral Twitter Threads",
  seoDescriptionTemplate: "Generate viral-style Twitter/X threads instantly using a keyword.",
  howtoSteps: [
    "Enter a topic or keyword.",
    "Generate thread tweets.",
    "Copy and post on Twitter/X."
  ]
},

{
  title: "Twitter Bio Generator",
  slug: "twitter-bio-generator",
  category: "Social Media Tools",
  description: "Generate clean and professional Twitter/X bios.",
  seoTitleTemplate: "Twitter Bio Generator — Create Professional Bios",
  seoDescriptionTemplate: "Generate professional Twitter/X bio ideas using keywords.",
  howtoSteps: [
    "Enter a keyword or niche.",
    "Generate bio ideas.",
    "Copy and paste to your profile."
  ]
},

{
  title: "Twitter Hashtag Generator",
  slug: "twitter-hashtag-generator",
  category: "Social Media Tools",
  description: "Generate trending hashtags for Twitter/X posts.",
  seoTitleTemplate: "Twitter Hashtag Generator — Trending Hashtags Tool",
  seoDescriptionTemplate: "Generate relevant and trending Twitter/X hashtags instantly.",
  howtoSteps: [
    "Enter a keyword.",
    "Generate hashtag list.",
    "Copy and use in your tweet."
  ]
},

{
  title: "YouTube Description Generator",
  slug: "youtube-description-generator",
  category: "Social Media Tools",
  description: "Generate SEO-friendly YouTube video descriptions.",
  seoTitleTemplate: "YouTube Description Generator — SEO Video Descriptions",
  seoDescriptionTemplate: "Generate optimized YouTube descriptions using keywords to improve ranking.",
  howtoSteps: [
    "Enter your video keyword.",
    "Generate description.",
    "Copy and paste into YouTube."
  ]
},

{
  title: "YouTube Tags Generator",
  slug: "youtube-tags-generator",
  category: "Social Media Tools",
  description: "Generate optimized YouTube tags using a keyword.",
  seoTitleTemplate: "YouTube Tags Generator — Optimize Video Tags",
  seoDescriptionTemplate: "Generate SEO-friendly YouTube tags instantly to improve discoverability.",
  howtoSteps: [
    "Enter video keyword.",
    "Generate tag list.",
    "Copy and paste into YouTube."
  ]
},

{
  title: "YouTube Title Generator",
  slug: "youtube-title-generator",
  category: "Social Media Tools",
  description: "Generate engaging YouTube video titles.",
  seoTitleTemplate: "YouTube Title Generator — Catchy Video Titles",
  seoDescriptionTemplate: "Generate clickable and engaging YouTube titles using keywords.",
  howtoSteps: [
    "Enter your video topic.",
    "Generate title ideas.",
    "Copy and use as your video title."
  ]
},



{
  title: "YouTube Thumbnail Downloader",
  slug: "youtube-thumbnail-downloader",
  category: "Social Media Tools",
  popular: true,
  description: "Download YouTube video thumbnails in HD, Full HD, and 4K.",
  seoTitleTemplate: "YouTube Thumbnail Downloader — Download HD Thumbnails",
  seoDescriptionTemplate: "Download YouTube thumbnails in HD, Full HD, and 4K instantly. Fast, secure, and completely free."
,
faqs: [
  {
    q: "How does the YouTube Thumbnail Downloader work?",
    a: "Enter the video URL and the tool fetches the HD, Full HD or 4K thumbnail from YouTube."
  },
  {
    q: "Do I need a YouTube account?",
    a: "No, you can download thumbnails without signing in."
  }
],
howtoSteps: [
  "Copy the URL of the YouTube video.",
  "Paste it into the input box.",
  "Click Get Thumbnail to fetch available resolutions.",
  "Download the thumbnail image you want."
]


},

/*{
  title: "Instagram DP Viewer",
  slug: "instagram-dp-viewer",
  category: "Social Media Tools",
  description: "View Instagram profile pictures in full size without logging in.",
  seoTitleTemplate: "Instagram DP Viewer — View Full-Size Profile Photos",
  seoDescriptionTemplate: "View Instagram DP in full size instantly. No login required, completely free and mobile-friendly."
,
faqs: [
  {
    q: "Can I view Instagram profile pictures in full size?",
    a: "Yes, this tool displays Instagram profile photos in full resolution instantly."
  },
  {
    q: "Do I need to log in?",
    a: "No login or Instagram account is required."
  }
],
howtoSteps: [
  "Enter the Instagram username.",
  "Click View DP to fetch the profile picture.",
  "Download the full-size profile photo."
]


},
*/
{
  title: "Instagram Hashtag Generator",
  slug: "instagram-hashtag-generator",
  category: "Social Media Tools",
  description: "Generate trending and relevant Instagram hashtags based on keywords.",
  seoTitleTemplate: "Instagram Hashtag Generator — Get Trending Hashtags",
  seoDescriptionTemplate: "Generate trending Instagram hashtags from any keyword. Boost reach and engagement instantly."
,
faqs: [
  {
    q: "How does the Instagram Hashtag Generator work?",
    a: "It analyzes your keyword and generates trending and relevant hashtags for Instagram posts."
  },
  {
    q: "Are the hashtags updated?",
    a: "Yes, they are based on commonly trending and popular hashtag patterns."
  }
],
howtoSteps: [
  "Enter a keyword related to your content.",
  "Click Generate Hashtags to get relevant suggestions.",
  "Copy the hashtags and use them in your Instagram post."
]


},

/*{
  title: "YouTube Tag Extractor",
  slug: "youtube-tag-extractor",
  category: "Social Media Tools",
  description: "Extract tags and keywords from any YouTube video in one click.",
  seoTitleTemplate: "YouTube Tag Extractor — Extract Video Tags Instantly",
  seoDescriptionTemplate: "Extract YouTube video tags instantly to boost SEO, ranking and keyword targeting."
,
faqs: [
  {
    q: "What does the YouTube Tag Extractor do?",
    a: "It extracts tags and keywords from any YouTube video using the video URL."
  },
  {
    q: "Why are YouTube tags important?",
    a: "They help creators understand SEO terms used to improve video discoverability."
  }
],
howtoSteps: [
  "Paste the URL of the YouTube video.",
  "Click Extract Tags to fetch all hidden tags.",
  "Copy the tags for SEO analysis or your own video optimization."
]


},

/*{
  title: "Facebook Video Downloader",
  slug: "facebook-video-downloader",
  category: "Social Media Tools",
  description: "Download Facebook videos in HD and SD quickly and securely.",
  seoTitleTemplate: "Facebook Video Downloader — Download Videos Online",
  seoDescriptionTemplate: "Download Facebook videos in HD or SD instantly. Fast, secure and works without login."
,
faqs: [
  {
    q: "Can I download Facebook videos with this tool?",
    a: "Yes, enter the video link to download Facebook videos in HD or SD quality."
  },
  {
    q: "Do I need to log in?",
    a: "No, this tool works without any login or account access."
  }
],
howtoSteps: [
  "Copy the Facebook video link.",
  "Paste it into the download box.",
  "Click Download to fetch video formats.",
  "Choose your preferred resolution to save the video."
]


},

/*{
  title: "Instagram Video Downloader",
  slug: "instagram-video-downloader",
  category: "Social Media Tools",
  description: "Download Instagram reels, videos and IGTV content instantly.",
  seoTitleTemplate: "Instagram Video Downloader — Download Reels & Videos",
  seoDescriptionTemplate: "Download Instagram videos, reels and IGTV content instantly. No login required."
,
faqs: [
  {
    q: "What can I download with this tool?",
    a: "You can download Instagram reels, videos and IGTV content instantly using the post URL."
  },
  {
    q: "Is my data safe?",
    a: "Yes, no personal data is stored or required."
  }
],
howtoSteps: [
  "Copy the Instagram post or reel link.",
  "Paste it into the input field.",
  "Click Download to load the video.",
  "Save the video in your preferred quality."
]


}, */

/*{
  title: "TikTok Video Downloader",
  slug: "tiktok-video-downloader",
  category: "Social Media Tools",
  description: "Download TikTok videos with or without watermark for free.",
  seoTitleTemplate: "TikTok Video Downloader — Download Videos (No Watermark)",
  seoDescriptionTemplate: "Download TikTok videos instantly with or without watermark. Free, fast and mobile-friendly."
,
faqs: [
  {
    q: "Can I download TikTok videos without watermark?",
    a: "Yes, you can choose to download TikTok videos with or without watermark."
  },
  {
    q: "Does the tool support HD quality?",
    a: "Yes, HD download options are supported when available."
  }
],
howtoSteps: [
  "Copy the TikTok video URL.",
  "Paste it into the input box.",
  "Choose download with or without watermark.",
  "Click Download to save the video."
]


}, */
// PDF TOOLS /// 
{
  title: "Images to PDF",
  slug: "images-to-pdf",
  category: "PDF Tools",
  description: "Convert multiple images into a single PDF file instantly.",
  seoTitleTemplate: "{title} — Convert Images to PDF",
  seoDescriptionTemplate: "Use {title} to combine JPG/PNG/WEBP images into one PDF. Fast, free and secure.",
  faqs: [],
  howtoSteps: ["Upload images.", "Arrange order if needed.", "Download the PDF."]
},
{
  title: "Merge PDF",
  slug: "merge-pdfs",
  category: "PDF Tools",
  description: "Merge multiple PDF files into one document.",
  seoTitleTemplate: "{title} — Merge PDF Files Online",
  seoDescriptionTemplate: "Use {title} to merge PDFs into one file. Fast, free and works on any device.",
  faqs: [],
  howtoSteps: ["Upload PDFs.", "Arrange order.", "Download merged PDF."]
},
{
  title: "Protect PDF",
  slug: "protect-pdf",
  category: "PDF Tools",
  description: "Add a password to protect your PDF file.",
  seoTitleTemplate: "{title} — Password Protect a PDF",
  seoDescriptionTemplate: "Use {title} to add password protection to PDFs. Secure and easy.",
  faqs: [],
  howtoSteps: ["Upload PDF.", "Enter password.", "Download protected PDF."]
},
{
  title: "Split PDF",
  slug: "split-pdf",
  category: "PDF Tools",
  description: "Split a PDF into separate pages or page ranges.",
  seoTitleTemplate: "{title} — Split PDF Pages Online",
  seoDescriptionTemplate: "Split PDF pages instantly with {title}. Extract specific page ranges quickly.",
  faqs: [],
  howtoSteps: ["Upload PDF.", "Choose split range.", "Download split files."]
},
{
  title: "Unlock PDF",
  slug: "unlock-pdf",
  category: "PDF Tools",
  description: "Remove password protection from a PDF (when you have permission).",
  seoTitleTemplate: "{title} — Unlock a PDF File Online",
  seoDescriptionTemplate: "Use {title} to unlock PDFs when you know the password. Fast and secure.",
  faqs: [],
  howtoSteps: ["Upload PDF.", "Enter password.", "Download unlocked PDF."]
},

{
  title: "PDF Compressor",
  slug: "pdf-compressor",
  category: "PDF Tools",
  description: "Compress PDF files online without losing quality. Fast, free, and secure.",
  seoTitleTemplate: "{title} — Compress PDF Files Online",
  seoDescriptionTemplate: "Compress PDF files online for free. Reduce file size without losing quality.",
  faqs: [
    {
      q: "Will my compressed PDF lose quality?",
      a: "Our smart compression engine reduces file size while keeping text and images readable."
    },
    {
      q: "Are my PDFs safe?",
      a: "Files are processed locally in your browser and never stored on our servers."
    }
  ],
  howtoSteps: [
    "Upload your PDF file.",
    "Choose your compression level.",
    "Wait for processing.",
    "Download the compressed PDF."
  ]
},
{
  title: "Extract Images from PDF",
  slug: "pdf-extract-images",
  category: "PDF Tools",
  description: "Extract all images from a PDF instantly.",
  seoTitleTemplate: "{title} — Extract All Images from PDF",
  seoDescriptionTemplate: "Upload your PDF and extract all embedded images automatically.",
  faqs: [],
  howtoSteps: [
    "Upload your PDF.",
    "Click Extract.",
    "Download the extracted images."
  ]
},
{
  title: "PDF Metadata Viewer",
  slug: "pdf-metadata-viewer",
  category: "PDF Tools",
  description: "View metadata stored inside your PDF files.",
  seoTitleTemplate: "{title} — View PDF Metadata Online",
  seoDescriptionTemplate: "Check PDF metadata including author, creation date, modification date, and more.",
  faqs: [],
  howtoSteps: [
    "Upload a PDF.",
    "Wait for metadata extraction.",
    "Review the displayed metadata."
  ]
},
{
  title: "PDF Page Numbering Tool",
  slug: "pdf-page-numbering",
  category: "PDF Tools",
  description: "Add custom page numbers to your PDF online.",
  seoTitleTemplate: "{title} — Add Page Numbers to PDF",
  seoDescriptionTemplate: "Add page numbers to your PDF in seconds. Free and easy.",
  faqs: [],
  howtoSteps: [
    "Upload the PDF.",
    "Choose position and style.",
    "Apply numbering.",
    "Download final PDF."
  ]
},
{
  title: "PDF to Images",
  slug: "pdf-to-images",
  category: "PDF Tools",
  description: "Convert PDF pages into high-quality images.",
  seoTitleTemplate: "{title} — Convert PDF to Images",
  seoDescriptionTemplate: "Convert PDF to JPG or PNG instantly.",
  faqs: [],
  howtoSteps: [
    "Upload your PDF.",
    "Select output format.",
    "Download generated images."
  ]
},
{
  title: "PDF to Text",
  slug: "pdf-to-text",
  category: "PDF Tools",
  description: "Extract text from PDF files using fast text processing.",
  seoTitleTemplate: "{title} — Extract Text from PDF",
  seoDescriptionTemplate: "Convert PDF documents into plain text.",
  faqs: [],
  howtoSteps: [
    "Upload your PDF.",
    "Click Convert.",
    "Copy or download extracted text."
  ]
},

{
  title: "PDF Watermark Tool",
  slug: "pdf-watermark",
  category: "PDF Tools",
  description: "Add text or image watermarks to your PDF files.",
  seoTitleTemplate: "{title} — Add Watermark to PDF",
  seoDescriptionTemplate: "Add professional watermarks to your PDFs online for free.",
  faqs: [],
  howtoSteps: [
    "Upload PDF.",
    "Enter your watermark text or upload image.",
    "Apply watermark.",
    "Download updated PDF."
  ]
},
{
  title: "Word and PDF Converter",
  slug: "pdf-word-converter",
  category: "PDF Tools",
  description: "Convert Word documents into PDF format and PDF to Word",
  seoTitleTemplate: "{title} — Convert Word to PDF",
  seoDescriptionTemplate: "Upload your DOC or DOCX file and convert it to PDF.",
  faqs: [],
  howtoSteps: [
    "Upload Word document.",
    "Click Convert.",
    "Download generated PDF."
  ]
},
// ============================
// SEO TOOLS
// ============================
{
  title: "Open Graph Tag Generator",
  slug: "open-graph-generator",
  category: "SEO Tools",
  description: "Generate Open Graph meta tags for better social previews.",
  seoTitleTemplate: "{title} — Generate Open Graph Tags",
  seoDescriptionTemplate: "Use {title} to generate OG meta tags for Facebook, WhatsApp, Twitter/X and other platforms.",
  faqs: [],
  howtoSteps: ["Enter page title/description/image URL.", "Generate tags.", "Copy into your HTML head."]
},

{
  title: "URL Encoder / Decoder",
  slug: "url-encoder-decoder",
  category: "SEO Tools",
  description: "Encode or decode URLs instantly for SEO, tracking parameters, and development use.",
  seoTitleTemplate: "URL Encoder Decoder — Encode & Decode URLs Online",
  seoDescriptionTemplate: "Encode or decode URLs instantly. Perfect for SEO, UTM parameters, redirects and web development.",
  faqs: [
    {
      q: "What is a URL encoder?",
      a: "A URL encoder converts special characters into a format that can be safely transmitted over the internet."
    },
    {
      q: "Why do I need to decode URLs?",
      a: "Decoding URLs helps you read encoded parameters, tracking values, and redirected URLs clearly."
    }
  ],
  howtoSteps: [
    "Paste your URL or text into the input box.",
    "Click Encode to encode the URL.",
    "Click Decode to decode encoded text.",
    "Copy the result for use."
  ]
},

{
  title: "Semantic Keyword Generator",
  slug: "semantic-keyword-generator",
  category: "SEO Tools",
  description: "Generate semantically related keywords to improve topical relevance and SEO rankings.",
  seoTitleTemplate: "Semantic Keyword Generator — Find Related SEO Keywords",
  seoDescriptionTemplate: "Generate semantic and related keywords to improve topical authority and SEO performance.",
  faqs: [
    {
      q: "What are semantic keywords?",
      a: "Semantic keywords are closely related terms that help search engines understand topic context."
    },
    {
      q: "Why are semantic keywords important for SEO?",
      a: "They improve topical relevance, reduce keyword stuffing, and help pages rank for multiple queries."
    }
  ],
  howtoSteps: [
    "Enter your main keyword.",
    "Generate related semantic keywords.",
    "Use them naturally in your content."
  ]
},

{
  title: "XML Sitemap Generator",
  slug: "xml-sitemap-generator",
  category: "SEO Tools",
  description: "Generate a clean XML sitemap for your website pages.",
  seoTitleTemplate: "XML Sitemap Generator — Create Sitemap.xml Online",
  seoDescriptionTemplate: "Create SEO-friendly XML sitemaps to help search engines crawl your website efficiently.",
  faqs: [
    {
      q: "What is an XML sitemap?",
      a: "An XML sitemap lists website URLs to help search engines discover and index pages."
    },
    {
      q: "Do I need a sitemap?",
      a: "Yes, especially for large websites or frequently updated content."
    }
  ],
  howtoSteps: [
    "Enter your website URL.",
    "Add page paths.",
    "Generate and download the sitemap XML."
  ]
},

{
  title: "Robots.txt Generator",
  slug: "robots-txt-generator",
  category: "SEO Tools",
  description: "Create SEO-friendly robots.txt files to control search engine crawling.",
  seoTitleTemplate: "Robots.txt Generator — Control Search Engine Crawling",
  seoDescriptionTemplate: "Generate robots.txt files to allow or block search engines from specific pages.",
  faqs: [
    {
      q: "What is robots.txt?",
      a: "robots.txt tells search engines which pages they are allowed to crawl."
    },
    {
      q: "Can robots.txt block indexing?",
      a: "It controls crawling, not indexing directly."
    }
  ],
  howtoSteps: [
    "Choose allow or disallow rules.",
    "Add sitemap URL if available.",
    "Generate robots.txt file."
  ]
},

{
  title: "Meta Tag Generator",
  slug: "meta-tag-generator",
  category: "SEO Tools",
  description: "Generate SEO-optimized meta titles, descriptions and OG tags.",
  seoTitleTemplate: "Meta Tag Generator — Create SEO Meta Tags",
  seoDescriptionTemplate: "Generate meta titles, descriptions, Open Graph and Twitter tags instantly.",
  faqs: [
    {
      q: "Why are meta tags important?",
      a: "They influence rankings and click-through rates from search results."
    }
  ],
  howtoSteps: [
    "Enter page title and description.",
    "Add keywords.",
    "Generate meta tags."
  ]
},

{
  title: "Keyword Density Checker",
  slug: "keyword-density-checker",
  category: "SEO Tools",
  description: "Analyze keyword frequency and density in your content.",
  seoTitleTemplate: "Keyword Density Checker — Analyze SEO Keyword Usage",
  seoDescriptionTemplate: "Check keyword density to avoid over-optimization and improve SEO balance.",
  faqs: [
    {
      q: "What is ideal keyword density?",
      a: "Generally between 1–2%, depending on content length and intent."
    }
  ],
  howtoSteps: [
    "Paste your content.",
    "Enter target keyword.",
    "Analyze keyword density."
  ]
},

{
  title: ".htaccess Redirect Generator",
  slug: "htaccess-redirect-generator",
  category: "SEO Tools",
  description: "Generate 301 redirect rules for .htaccess files.",
  seoTitleTemplate: ".htaccess Redirect Generator — Create 301 Redirects",
  seoDescriptionTemplate: "Generate SEO-safe 301 redirect rules for domain or page changes.",
  faqs: [
    {
      q: "Why use 301 redirects?",
      a: "They preserve SEO value when URLs change."
    }
  ],
  howtoSteps: [
    "Enter old URL.",
    "Enter new URL.",
    "Generate redirect rule."
  ]
},

{
  title: "Google SERP Preview",
  slug: "google-serp-preview",
  category: "SEO Tools",
  description: "Preview how your page appears in Google search results.",
  seoTitleTemplate: "Google SERP Preview — See How Your Page Appears",
  seoDescriptionTemplate: "Preview page titles, URLs and meta descriptions exactly like Google search results.",
  faqs: [
    {
      q: "Does SERP preview match Google exactly?",
      a: "It closely simulates Google’s desktop results appearance."
    }
  ],
  howtoSteps: [
    "Enter page title.",
    "Enter meta description.",
    "Preview Google result snippet."
  ]
},

{
  title: "Canonical URL Generator",
  slug: "canonical-url-generator",
  category: "SEO Tools",
  description: "Generate canonical link tags to prevent duplicate content issues.",
  seoTitleTemplate: "Canonical URL Generator — Avoid Duplicate Content",
  seoDescriptionTemplate: "Create canonical link tags to consolidate SEO signals and avoid duplication.",
  faqs: [
    {
      q: "What is a canonical URL?",
      a: "It tells search engines which version of a page is primary."
    }
  ],
  howtoSteps: [
    "Enter full page URL.",
    "Generate canonical tag.",
    "Insert into HTML head."
  ]
},
// ============================
// CONVERTER TOOLS
// ============================
{
  title: "Area Converter",
  slug: "area-converter",
  category: "Converter Tools",
  description: "Convert area units instantly (sq ft, sq m, acres, hectares and more).",
  seoTitleTemplate: "{title} — Convert Area Units Online",
  seoDescriptionTemplate: "Use {title} to convert square feet, square meters, acres, hectares and more. Fast, free and accurate.",
  faqs: [],
  howtoSteps: ["Enter a value.", "Select input and output units.", "Copy the converted result."]
},
{
  title: "Length Converter",
  slug: "length-converter",
  category: "Converter Tools",
  description: "Convert length units instantly (mm, cm, m, km, inches, feet and more).",
  seoTitleTemplate: "{title} — Convert Length Units Online",
  seoDescriptionTemplate: "Use {title} to convert mm, cm, meters, kilometers, inches, feet and more. Fast and accurate.",
  faqs: [],
  howtoSteps: ["Enter a value.", "Choose units to convert from/to.", "Copy the result."]
},
{
  title: "Speed Converter",
  slug: "speed-converter",
  category: "Converter Tools",
  description: "Convert speed units instantly (km/h, mph, m/s and more).",
  seoTitleTemplate: "{title} — Convert Speed Units Online",
  seoDescriptionTemplate: "Convert speed units like km/h, mph and m/s using {title}. Free, fast and accurate.",
  faqs: [],
  howtoSteps: ["Enter speed.", "Select input/output units.", "View the converted speed."]
},
{
  title: "Temperature Converter",
  slug: "temperature-converter",
  category: "Converter Tools",
  description: "Convert Celsius, Fahrenheit and Kelvin instantly.",
  seoTitleTemplate: "{title} — Convert Celsius, Fahrenheit & Kelvin",
  seoDescriptionTemplate: "Use {title} to convert Celsius to Fahrenheit, Kelvin and vice versa. Accurate and instant.",
  faqs: [],
  howtoSteps: ["Enter a temperature.", "Pick source and target scale.", "Copy the converted value."]
},
{
  title: "Volume Converter",
  slug: "volume-converter",
  category: "Converter Tools",
  description: "Convert volume units instantly (liters, ml, gallons, cups and more).",
  seoTitleTemplate: "{title} — Convert Volume Units Online",
  seoDescriptionTemplate: "Convert liters, milliliters, gallons, cups and more with {title}. Fast and free.",
  faqs: [],
  howtoSteps: ["Enter volume.", "Select units.", "Get conversion instantly."]
},
{
  title: "Weight Converter",
  slug: "weight-converter",
  category: "Converter Tools",
  description: "Convert weight units instantly (kg, g, lbs, oz and more).",
  seoTitleTemplate: "{title} — Convert Weight Units Online",
  seoDescriptionTemplate: "Convert kilograms, grams, pounds and ounces with {title}. Fast and accurate.",
  faqs: [],
  howtoSteps: ["Enter weight.", "Choose input/output units.", "Copy the converted result."]
},
// ============================
// MATH TOOLS
// ============================
{
  title: "Average Calculator",
  slug: "average-calculator",
  category: "Math Tools",
  description: "Calculate mean (average) for a list of numbers instantly.",
  seoTitleTemplate: "{title} — Calculate Mean Online",
  seoDescriptionTemplate: "Use {title} to calculate the mean (average) of any set of numbers. Fast, free and accurate.",
  faqs: [],
  howtoSteps: ["Enter numbers (comma or space separated).", "Click calculate.", "Copy the result."]
},
{
  title: "Fraction Calculator",
  slug: "fraction-calculator",
  category: "Math Tools",
  description: "Add, subtract, multiply and divide fractions with steps.",
  seoTitleTemplate: "{title} — Fraction Math Online",
  seoDescriptionTemplate: "Use {title} to add, subtract, multiply or divide fractions instantly. Includes simplified results.",
  faqs: [],
  howtoSteps: ["Enter fractions.", "Choose operation.", "Get simplified answer."]
},
{
  title: "Number Base Converter",
  slug: "number-base-converter",
  category: "Math Tools",
  description: "Convert between binary, decimal, hexadecimal and more.",
  seoTitleTemplate: "{title} — Convert Binary, Decimal, Hex",
  seoDescriptionTemplate: "Convert numbers between binary, decimal, hex and other bases using {title}. Fast and accurate.",
  faqs: [],
  howtoSteps: ["Enter number.", "Select base in/out.", "Copy converted result."]
},
{
  title: "Percentage Calculator",
  slug: "percentage-calculator",
  category: "Math Tools",
  description: "Calculate percentages quickly for any value.",
  seoTitleTemplate: "{title} — Fast Percentage Calculator",
  seoDescriptionTemplate: "Use {title} to calculate percent increase, decrease, and percentage of any number instantly.",
  faqs: [],
  howtoSteps: ["Enter values.", "Choose percentage mode.", "View result."]
},
{
  title: "Ratio Calculator",
  slug: "ratio-calculator",
  category: "Math Tools",
  description: "Simplify and compare ratios instantly.",
  seoTitleTemplate: "{title} — Simplify Ratios Online",
  seoDescriptionTemplate: "Use {title} to simplify ratios and calculate proportional values. Fast and free.",
  faqs: [],
  howtoSteps: ["Enter ratio numbers.", "Click simplify.", "Copy result."]
},
{
  title: "Roman Numeral Converter",
  slug: "roman-numeral-converter",
  category: "Math Tools",
  description: "Convert Roman numerals to numbers and numbers to Roman numerals.",
  seoTitleTemplate: "{title} — Roman Numeral Converter",
  seoDescriptionTemplate: "Convert Roman numerals to integers and integers to Roman numerals with {title}.",
  faqs: [],
  howtoSteps: ["Enter a value.", "Choose conversion direction.", "View converted output."]
},
{
  title: "Scientific Calculator",
  slug: "scientific-calculator",
  category: "Math Tools",
  description: "Advanced scientific calculator for everyday calculations.",
  seoTitleTemplate: "{title} — Online Scientific Calculator",
  seoDescriptionTemplate: "Use {title} for advanced calculations including scientific functions. Fast and mobile-friendly.",
  faqs: [],
  howtoSteps: ["Enter expression.", "Use functions if needed.", "Get result instantly."]
},

// ============================
// HEALTH & FITNESS TOOLS
// ============================
{
  title: "BMI Calculator",
  slug: "bmi-calculator",
  category: "Health and Fitness Tools",
  description: "Calculate Body Mass Index (BMI) instantly and understand your category.",
  seoTitleTemplate: "{title} — Body Mass Index Calculator",
  seoDescriptionTemplate: "Use {title} to calculate BMI instantly. Helpful for fitness tracking and health goals.",
  faqs: [],
  howtoSteps: ["Enter height and weight.", "Click calculate.", "View BMI result and category."]
},
{
  title: "BMR Calculator",
  slug: "bmr-calculator",
  category: "Health and Fitness Tools",
  description: "Calculate Basal Metabolic Rate (BMR) to estimate daily calorie needs.",
  seoTitleTemplate: "{title} — Calculate BMR Online",
  seoDescriptionTemplate: "Use {title} to estimate BMR and daily calorie requirements. Fast, free and accurate.",
  faqs: [],
  howtoSteps: ["Enter age, height, weight and gender.", "Click calculate.", "View your BMR."]
},
{
  title: "Pregnancy Due Date Calculator",
  slug: "pregnancy-due-date-calculator",
  category: "Health and Fitness Tools",
  popular: true,
  description: "Calculate your baby’s estimated due date, pregnancy week, trimester, and conception date.",
  seoTitleTemplate: "Pregnancy Due Date Calculator — Estimate Baby Due Date",
  seoDescriptionTemplate:
    "Use this Pregnancy Due Date Calculator to estimate your baby’s due date, current pregnancy week, trimester, and conception date based on LMP.",
  faqs: [
    {
      q: "How is the pregnancy due date calculated?",
      a: "The calculator adds 280 days (40 weeks) to the first day of your last menstrual period (LMP), which is the standard medical method."
    },
    {
      q: "Is this pregnancy due date accurate?",
      a: "The result is an estimate. Actual delivery dates may vary depending on individual health and pregnancy factors."
    },
    {
      q: "Can I calculate my current pregnancy week?",
      a: "Yes, the tool shows your current pregnancy week and trimester based on today’s date."
    }
  ],
  howtoSteps: [
    "Select the first day of your last menstrual period (LMP).",
    "Click the Calculate Due Date button.",
    "View your estimated due date, pregnancy week, trimester, and conception date."
  ]
},

{
  title: "Body Fat Percentage Calculator",
  slug: "body-fat-calculator",
  category: "Health and Fitness Tools",
  description: "Estimate your body fat percentage using standard measurements.",
  seoTitleTemplate: "{title} — Estimate Body Fat Percentage",
  seoDescriptionTemplate: "Use {title} to estimate body fat percentage using proven formulas. Fast and easy.",
  faqs: [],
  howtoSteps: ["Enter measurements.", "Click calculate.", "View body fat estimate."]
},
{
  title: "Calorie Calculator",
  slug: "calorie-calculator",
  category: "Health and Fitness Tools",
  description: "Estimate daily calorie needs for maintenance, loss or gain.",
  seoTitleTemplate: "{title} — Daily Calorie Needs",
  seoDescriptionTemplate: "Use {title} to estimate daily calories based on goals and activity level. Free and accurate.",
  faqs: [],
  howtoSteps: ["Enter body details.", "Select activity level.", "View daily calorie estimate."]
},
{
  title: "Ideal Weight Calculator",
  slug: "ideal-weight-calculator",
  category: "Health and Fitness Tools",
  description: "Estimate ideal weight range using common medical formulas.",
  seoTitleTemplate: "{title} — Ideal Weight Estimator",
  seoDescriptionTemplate: "Use {title} to estimate an ideal weight range based on height and gender. Fast and free.",
  faqs: [],
  howtoSteps: ["Enter height and gender.", "Click calculate.", "View ideal weight range."]
},
{
  title: "Water Intake Calculator",
  slug: "water-intake-calculator",
  category: "Health and Fitness Tools",
  description: "Calculate recommended daily water intake based on your body and activity.",
  seoTitleTemplate: "{title} — Daily Water Intake Calculator",
  seoDescriptionTemplate: "Use {title} to estimate how much water you should drink daily. Simple and fast.",
  faqs: [],
  howtoSteps: ["Enter weight and activity.", "Click calculate.", "View recommended intake."]
},
/*{
  title: "Macro Calculator",
  slug: "macro-calculator",
  category: "Health and Fitness Tools",
  description: "Calculate protein, carbs and fat targets for your goals.",
  seoTitleTemplate: "{title} — Macro Nutrient Calculator",
  seoDescriptionTemplate: "Use {title} to calculate daily macros (protein, carbs, fat) based on your goal and calories.",
  faqs: [],
  howtoSteps: ["Enter calories and goal.", "Pick macro style.", "View macro breakdown."]
},
{
  title: "Protein Intake Calculator",
  slug: "protein-intake-calculator",
  category: "Health and Fitness Tools",
  description: "Estimate daily protein intake for muscle gain or fat loss goals.",
  seoTitleTemplate: "{title} — Daily Protein Calculator",
  seoDescriptionTemplate: "Use {title} to estimate protein needs based on weight and fitness goal. Fast and free.",
  faqs: [],
  howtoSteps: ["Enter weight and goal.", "Click calculate.", "View protein recommendation."]
},
*/
// ============================
// SECURITY TOOLS
// ============================
{
  title: "Hash Generator (MD5 / SHA-256)",
  slug: "hash-generator",
  category: "Security Tools",
  description: "Generate MD5, SHA-1 and SHA-256 hashes for any text.",
  seoTitleTemplate: "{title} — Generate Hash Online",
  seoDescriptionTemplate: "Generate MD5, SHA-1 or SHA-256 hashes instantly using {title}. Secure and fast.",
  faqs: [],
  howtoSteps: ["Enter text.", "Choose hash type.", "Copy generated hash."]
},
{
  title: "Password Generator",
  slug: "password-generator",
  category: "Security Tools",
  description: "Generate strong passwords with custom length and rules.",
  seoTitleTemplate: "{title} — Strong Password Generator",
  seoDescriptionTemplate: "Create secure passwords instantly using {title}. Customize length and character sets.",
  faqs: [],
  howtoSteps: ["Select length and options.", "Generate password.", "Copy it."]
},
{
  title: "Password Strength Checker",
  slug: "password-strength-checker",
  category: "Security Tools",
  description: "Check password strength and get improvement tips instantly.",
  seoTitleTemplate: "{title} — Check Password Strength",
  seoDescriptionTemplate: "Use {title} to test password strength and improve security. Fast and private.",
  faqs: [],
  howtoSteps: ["Type password.", "See strength score.", "Follow improvement tips."]
},

];

// DO NOT REMOVE THIS
export default toolsData; 
