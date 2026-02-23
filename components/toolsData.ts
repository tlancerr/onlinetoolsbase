export interface ToolItem {
  title: string;
  slug: string;
  category: string;
  popular?: boolean;

  description: string;
  seoTitleTemplate: string;
  seoDescriptionTemplate: string;
  longDescription: string;
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
  seoDescriptionTemplate: "Use this free Age Calculator to find your exact age in years, months, days, and more. Fast, accurate, and mobile-friendly.",
  longDescription: 'Need your exact age right now? This Age Calculator gives a precise breakdown of your age in years, months, days, hours, and minutes based on your date of birth and today’s date. It’s useful for everyday questions like “How old am I exactly?” as well as formal situations where accuracy matters, such as school admissions, job applications, registrations, or profile details.\n\nThe calculation accounts for real calendar rules, including different month lengths and leap years, so you’re not relying on rough estimates. You can also use it to calculate someone else’s age—just enter any valid birth date. Results are instant, easy to understand, and work smoothly on mobile and desktop.\n\nIf you're planning ahead for deadlines, subscriptions, or important milestones, you may also find our <a href=\"/tools/future-date\" title=\"Future Date Calculator\">future date calculator tool</a> helpful for calculating a date after a specific number of days, weeks, or months.',

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
  longDescription: "Sometimes “years” isn’t the most practical way to describe age—especially when you need a clearer sense of time passed. This tool converts your age into total months and total weeks, giving you a more granular view of duration. It’s popular for baby and child milestones, pregnancy and parenting schedules, medical tracking, academic planning, and any situation where you want a simple numeric total rather than a date range.\n\nJust enter your date of birth and the tool instantly displays your age expressed as complete weeks and months. The results are based on real date calculations (not a rough average), so you can trust it for planning and documentation. It’s quick, lightweight, and designed to be readable on any device.",

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
longDescription: "Want to compare two ages or measure the exact time between two dates? The Age Difference Calculator shows the precise difference in years, months, and days—ideal for relationships, siblings, colleagues, legal/official forms, HR records, and personal planning. Instead of guessing or doing manual math across months and leap years, you get a clean breakdown you can rely on.\n\nEnter the two dates (for example, two birthdays or any start/end dates) and the tool calculates the exact gap using proper calendar logic. This makes it especially helpful when the difference crosses different month lengths or leap days. The output is easy to read, accurate, and works instantly without sign-up.",

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
 longDescription: "Need to calculate how many weeks fall between two dates, or convert a day range into weeks quickly? The Weeks Calculator helps you measure time in a clean, week-based format that’s easy to understand for planning and reporting. It’s useful for pregnancy tracking, project timelines, school terms, fitness programs, payroll periods, and any schedule that’s managed in weekly cycles.\n\nSelect a start and end date and the tool returns the total number of weeks between them (and can also help interpret day ranges as weeks). The calculation is based on real calendar dates, so it naturally accounts for varying month lengths and leap years. Results appear instantly and work smoothly across mobile and desktop, making it a simple tool to keep planning accurate.",

faqs: [
  {
    q: "What does the Weeks Calculator do?",
    a: "It calculates the number of weeks between two selected dates, helping you understand a date range in weekly terms."
  },
  {
    q: "Does it handle leap years and different month lengths?",
    a: "Yes. The calculation is based on real calendar dates, so leap years and varying month lengths are included automatically."
  },
  {
    q: "Can I use it for pregnancy or baby week tracking?",
    a: "Yes. Many people track progress in weeks, and this tool makes it easy to calculate how many weeks have passed between two dates."
  },
  {
    q: "Does the result include both start and end dates?",
    a: "Most week calculators count the time elapsed between the two dates. If you need inclusive counting, you can adjust by adding a day depending on your use case."
  }
],

  howtoSteps: ["Pick start and end dates.", "Click calculate.", "View weeks result."]
},

{
  title: "Time Duration Calculator",
  slug: "time-duration",
  category: "Time and Age Tools",
  description: "Calculate the duration between two times accurately.",
  seoTitleTemplate: "Time Duration Calculator — Calculate Time Between Two Times",
  seoDescriptionTemplate: "Calculate time duration between any two times with this fast and accurate tool. Converts hours, minutes, and seconds instantly.",
  longDescription: 'The Time Duration Calculator measures the exact difference between two times and returns the duration in hours, minutes, and seconds. It’s ideal when you need precision for work shifts, time tracking, study sessions, exercise routines, travel planning, event timing, or any activity where “roughly” isn’t good enough.\n\nEnter a start time and an end time, then calculate to see the exact time gap instantly. The tool is designed to be fast and straightforward, so you can quickly verify schedules, log hours accurately, or plan deadlines with confidence on both mobile and desktop.\n\nIf you are calculating durations relative to a specific calendar date, our <a href=\"/tools/future-date\" title=\"Future Date Calculator\">Future Date Calculator</a> helps determine the exact resulting date after adding a time period. You can also verify ages and date-based calculations using the <a href=\"/tools/age-calculator\" title=\"Age Calculator\">Age Calculator</a>.',

faqs: [
  {
    q: "How does the Time Duration Calculator work?",
    a: "It calculates the time difference between two specific times, showing results in hours, minutes and seconds."
  },
  {
    q: "Where is a time duration calculator useful?",
    a: "It’s helpful for work logs, time tracking, event planning, and calculating the duration of activities."
  },
  {
    q: "Can it calculate durations that cross midnight?",
    a: "Yes. If your end time is after midnight, the tool can still calculate the correct duration based on the selected times."
  },
  {
    q: "Does it support seconds-level accuracy?",
    a: "Yes. It can show the time difference down to seconds, which is useful for detailed logs and precise timing."
  }


],

howtoSteps: [
  "Enter the start time.",
  "Enter the end time.",
  "Click Calculate to see the time difference in hours, minutes and seconds."
]


},

{
  title: "Days Between Dates Calculator",
  slug: "days-between-dates",
  category: "Time and Age Tools",
  description: "Find the number of days between two calendar dates.",
  seoTitleTemplate: "Days Between Dates — Calculate Days Difference",
  seoDescriptionTemplate: "Calculate the number of days between two dates instantly. Perfect for planning events, deadlines, and schedules.",
  longDescription: "The Days Between Dates tool calculates the exact number of days between two calendar dates, making it easy to plan timelines and avoid manual counting. It’s useful for deadline planning, travel and hotel stays, rental periods, project schedules, contract dates, school terms, and any situation where you need a clear day difference.\n\nPick a start date and an end date, then calculate to instantly see the precise number of days in between. The tool uses proper calendar rules, so leap years and month length differences are handled automatically. Results are quick, readable, and reliable across all devices.",

faqs: [
  {
    q: "How is the number of days between two dates calculated?",
    a: "The calculator subtracts the earlier date from the later date, returning the exact number of days between them."
  },
  {
    q: "Does it consider leap years?",
    a: "Yes, the calculation automatically includes leap years and all calendar adjustments."
  },
  {
    q: "Does the result include the start date and end date?",
    a: "Typically it shows the days between the two dates (elapsed days). If you need inclusive counting, you can add 1 day depending on your use case."
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
  popular: true,
  description: "Calculate how many days remain until a future date.",
  seoTitleTemplate: "Days Until Calculator — Count Days Until Any Date",
  seoDescriptionTemplate: "Find out how many days are left until any event or date. Ideal for countdowns and important reminders.",
longDescription: "The Days Until Calculator helps you quickly find out how many days remain until a future date. It’s ideal for counting down to important events such as holidays, travel plans, project deadlines, birthdays, exams, or personal milestones. Instead of manually counting calendar days, the tool gives you an instant and accurate result.\n\nSimply select a future date and calculate to see how many days are left. The calculation is based on real calendar logic, so month length differences and leap years are handled automatically. The result is clear, easy to read, and works reliably on both desktop and mobile devices.",

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
  popular: true,
  description: "Add days, weeks, months or years to any date to find a future date.",
  seoTitleTemplate: "Future Date Calculator — Add Days to Date",
  seoDescriptionTemplate: "Calculate future dates easily by adding days, weeks, months, or years. Great for planning and scheduling.",
  longDescription: 'The Future Date Calculator allows you to determine an exact future date by adding days, weeks, months, or years to any chosen starting date. It’s especially useful for planning contracts, schedules, project milestones, payment due dates, reminders, subscriptions, and long-term planning where precision matters.\n\nAfter selecting a start date, you can add a specific time period and instantly see the resulting future date. The tool automatically accounts for real calendar rules, including leap years and different month lengths, so the result is accurate and reliable. It’s designed to be fast, simple, and easy to use across all devices.\n\nIf you need to calculate how old someone will be on that future date, you can use our <a href=\"/tools/age-calculator\" title=\"Age Calculator\">Age Calculator</a>. For medical planning, our <a href=\"/tools/pregnancy-due-date-calculator\" title=\"Pregnancy Due Date Calculator\">Pregnancy Due Date Calculator</a> helps estimate important milestones. You can also measure the exact gap between two times using the <a href=\"/tools/time-duration\" title=\"Time Duration Calculator\">Time Duration Calculator</a>.',

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
longDescription: "The Past Date Calculator helps you find an exact date in the past by subtracting days, weeks, months, or years from a selected starting date. It’s useful for documentation, legal references, academic work, reporting, audits, historical comparisons, or simply checking when something occurred.\n\nChoose a reference date, enter how much time to subtract, and calculate to instantly get the correct past date. The calculation follows proper calendar logic, meaning leap years and varying month lengths are automatically considered. The tool is fast, dependable, and works seamlessly on both mobile and desktop.",

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
longDescription: 'The Loan Calculator helps you estimate the true cost of a loan before you commit. By calculating your monthly EMI, total interest payable, and overall repayment amount, it gives you a clear picture of how a loan will impact your finances. It’s suitable for home loans, personal loans, car loans, education loans, and most standard lending products.\n\nBy adjusting the loan amount, interest rate, or tenure, you can instantly compare different scenarios and see how small changes affect your monthly payment and total cost. The calculator uses standard amortization formulas followed by banks and lenders worldwide, making it a reliable tool for planning, budgeting, and informed financial decisions.\n\nIf you specifically want to calculate only the fixed monthly installment amount, you can use our <a href="/tools/emi-calculator" title="EMI Calculator">EMI Calculator</a> for a quick breakdown. Home buyers may also prefer the <a href="/tools/mortgage-calculator" title="Mortgage Calculator">Mortgage Calculator</a>, which includes property taxes and insurance for a more detailed housing estimate. To understand the effective interest percentage behind a loan offer, the <a href="/tools/interest-rate-calculator" title="Interest Rate Calculator">Interest Rate Calculator</a> can help you verify the terms.',

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
  longDescription: 'The Simple Interest Calculator allows you to quickly calculate interest earned or paid using the basic simple interest formula. It’s commonly used for short-term loans, informal lending, basic savings calculations, and educational purposes where compound interest does not apply.\n\nEnter the principal amount, interest rate, and time period to instantly see the interest earned and the total amount payable. The calculator is fast, easy to understand, and ideal when you need a straightforward financial estimate without complex compounding.\n\nFor long-term investments where interest compounds over time, the <a href="/tools/compound-interest-calculator" title="Compound Interest Calculator">Compound Interest Calculator</a> is more appropriate. If you are evaluating loan repayment structures instead of earnings, you may also find the <a href="/tools/loan-calculator" title="Loan Calculator">Loan Calculator</a> useful for a full repayment breakdown.',

faqs: [
  {
    q: "What is simple interest?",
    a: "Simple interest is calculated only on the original principal amount and does not compound over time."
  },
  {
    q: "When should I use a simple interest calculator?",
    a: "It is best used for short-term loans, basic savings, classroom examples, or agreements where interest does not compound."
  },
  {
    q: "Is this suitable for bank loans?",
    a: "Most bank loans use compound interest. This calculator is best for scenarios where simple interest is explicitly applied."
  }
],

  howtoSteps: ["Enter principal, rate, and time.", "Click calculate.", "View interest and total amount."]
},
{
  title: "Mortgage Calculator",
  slug: "mortgage-calculator",
  category: "Finance Tools",
  description: "Estimate your monthly mortgage payments including principal, interest, taxes and insurance.",
  seoTitleTemplate: "Mortgage Calculator — Estimate Monthly Payments",
  seoDescriptionTemplate: "Calculate your mortgage payments with interest, taxes and insurance included. Get instant amortization schedules with this free tool.",
longDescription: 'The Mortgage Calculator helps you estimate your monthly home loan payments with greater accuracy by including principal, interest, property taxes, and insurance. It’s an essential planning tool for anyone buying a home, refinancing, or comparing mortgage offers from different lenders.\n\nBy entering the loan amount, interest rate, and tenure, you can instantly view estimated monthly payments and understand long-term costs. Optional tax and insurance inputs provide a more realistic picture of actual housing expenses. The calculations follow industry-standard mortgage formulas used by banks and financial institutions worldwide.\n\nFor general loan comparisons beyond home financing, you can use the <a href="/tools/loan-calculator" title="Loan Calculator">Loan Calculator</a> to evaluate different borrowing options. If you only need to compute the monthly installment quickly, the <a href="/tools/emi-calculator" title="EMI Calculator">EMI Calculator</a> provides a simplified view. To analyze investment growth instead of borrowing costs, consider the <a href="/tools/compound-interest-calculator" title="Compound Interest Calculator">Compound Interest Calculator</a>.',

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
longDescription: 'The Interest Rate Calculator helps you determine the effective interest rate when you already know the principal amount, total amount payable, and time period. This is useful when reviewing loan agreements, investment returns, savings plans, or informal financial arrangements where the interest rate isn’t clearly stated.\n\nBy working backward from the final amount, the tool reveals the implied interest rate, making it easier to compare loans, evaluate returns, or verify financial terms. The calculator is fast, accurate, and suitable for both borrowing and saving scenarios.\n\nIf you already know the interest rate and want to calculate total repayment or EMI, you can use the <a href="/tools/loan-calculator" title="Loan Calculator">Loan Calculator</a> or the <a href="/tools/emi-calculator" title="EMI Calculator">EMI Calculator</a>. For savings and investment growth scenarios, the <a href="/tools/compound-interest-calculator" title="Compound Interest Calculator">Compound Interest Calculator</a> provides detailed compounding projections.',

faqs: [
  {
    q: "How does the Interest Rate Calculator work?",
    a: "It calculates the interest rate using the principal amount, total payable amount, and time duration you provide."
  },
  {
    q: "Can I use it for both loans and savings?",
    a: "Yes, it works for loans, fixed deposits, savings accounts and investment comparisons."
  },
  {
    q: "Does it calculate compound interest rates?",
    a: "This calculator determines an effective rate based on provided values. For detailed compounding scenarios, a compound interest calculator is recommended."
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
longDescription: 'The EMI Calculator helps you estimate your fixed monthly loan payment (Equated Monthly Installment) in seconds. It’s useful for comparing home loans, car loans, personal loans, and other standard borrowing options where you need a clear view of affordability before you apply.\n\nBy entering the loan amount, interest rate, and tenure, you can instantly see the estimated EMI along with total interest and total repayment. This makes it easy to compare different offers, adjust the tenure to reduce monthly burden, or see how small interest rate changes affect the overall cost. The calculator uses standard EMI and amortization logic commonly used by lenders worldwide.\n\nIf you want a broader overview including total interest and amortization details, our <a href="/tools/loan-calculator" title="Loan Calculator">Loan Calculator</a> provides a complete repayment breakdown. Home financing scenarios can be evaluated more precisely with the <a href="/tools/mortgage-calculator" title="Mortgage Calculator">Mortgage Calculator</a>. To verify or compare the implied rate in different offers, you may also use the <a href="/tools/interest-rate-calculator" title="Interest Rate Calculator">Interest Rate Calculator</a>.',

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
longDescription: 'The Compound Interest Calculator estimates how your savings or investments can grow over time when interest is compounded. Unlike simple interest, compound interest calculates returns on both the original principal and the accumulated interest, which can significantly increase long-term growth.\n\nEnter your principal amount, interest rate, compounding frequency (such as yearly, monthly, or daily), and time period to instantly view projected growth. This tool is useful for investment planning, savings goals, retirement projections, and comparing different compounding options in a clear, easy-to-understand way.\n\nIf you invest regularly instead of making a single deposit, the <a href="/tools/sip-calculator" title="SIP Calculator">SIP Calculator</a> can estimate returns on monthly contributions. For simpler scenarios where interest does not compound, the <a href="/tools/simple-interest-calculator" title="Simple Interest Calculator">Simple Interest Calculator</a> may be sufficient. You can also evaluate overall profitability using the <a href="/tools/investment-return-calculator" title="Investment Return Calculator">Investment Return Calculator</a>.',

faqs: [
  {
    q: "What is compound interest?",
    a: "Compound interest is the interest calculated on the initial principal plus accumulated interest from previous periods."
  },
  {
    q: "Does this tool support monthly and yearly compounding?",
    a: "Yes, you can choose annual, monthly or even daily compounding for accurate growth projections."
  },
  {
    q: "Does it include additional deposits over time?",
    a: "This calculator focuses on compounding growth based on the inputs provided. If you invest regularly, a SIP or recurring deposit calculator may be more suitable."
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
longDescription: 'The SIP Calculator helps you estimate the future value of regular monthly investments (Systematic Investment Plan). It’s widely used for mutual fund planning and long-term wealth building because it shows how consistent investing combined with compounding can grow over time.\n\nEnter your monthly SIP amount, expected annual return rate, and investment duration to see the estimated maturity value, total invested amount, and potential gains. Since SIPs are market-linked, the output is an estimate—not a guarantee—but it’s extremely useful for planning goals, comparing durations, and understanding how returns and time affect results.\n\nIf you prefer a lump-sum investment calculation instead of monthly contributions, use the <a href="/tools/compound-interest-calculator" title="Compound Interest Calculator">Compound Interest Calculator</a>. To compare overall profitability across different rates and durations, the <a href="/tools/investment-return-calculator" title="Investment Return Calculator">Investment Return Calculator</a> can help you analyze potential outcomes.',

faqs: [
  {
    q: "How does the SIP Calculator estimate returns?",
    a: "It uses the compound interest formula and monthly contributions to find total investment value and expected returns."
  },
  {
    q: "Is SIP return guaranteed?",
    a: "No, SIP returns are market-linked and depend on mutual fund performance. The calculator provides an estimate only."
  },
  {
    q: "What return rate should I enter?",
    a: "Use an expected average annual rate based on historical performance and your risk profile. Trying a conservative and an optimistic rate can help you compare scenarios."
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
longDescription: 'The Currency Converter lets you convert amounts between major world currencies using exchange rates that are updated frequently. It’s useful for travel budgeting, online shopping, international invoices, freelance payments, and comparing prices across countries without manual calculations.\n\nSelect the currency you want to convert from and to, enter an amount, and view the converted value instantly. Exchange rates can change throughout the day due to market movement, so the converted result should be treated as an estimate—especially for large transactions. For bank transfers or card payments, the final rate may differ slightly due to provider fees or markups.\n\nIf you are calculating tax obligations in another country, the <a href="/tools/global-tax-calculator" title="Global Tax Calculator">Global Tax Calculator</a> can estimate income tax based on local brackets. To evaluate investment returns in different currencies, you may also use the <a href="/tools/investment-return-calculator" title="Investment Return Calculator">Investment Return Calculator</a>.',

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
longDescription: 'The Salary to Hourly Calculator converts an annual salary into estimated hourly, weekly, and monthly earnings. It’s useful for comparing job offers, evaluating freelance vs salaried pay, budgeting, and understanding your real earning rate when work hours vary.\n\nEnter your salary and provide your work schedule assumptions (such as hours per week and weeks per year) to see an instant breakdown. Because different employers define “full-time” differently and paid leave can vary, the results are estimates—but they’re excellent for quick comparisons and planning.\n\nTo estimate your income tax after converting salary figures, you can use the <a href="/tools/global-tax-calculator" title="Global Tax Calculator">Global Tax Calculator</a>. If you receive payments in foreign currencies, the <a href="/tools/currency-converter" title="Currency Converter">Currency Converter</a> can help you compare earnings across countries.',

faqs: [
  {
    q: "How is salary converted to hourly rate?",
    a: "The calculator divides your annual salary by total yearly working hours to estimate your hourly earnings."
  },
  {
    q: "Can I convert hourly to salary?",
    a: "Yes, simply reverse the values by entering hourly income and working hours to estimate annual salary."
  },
  {
    q: "Do the results include taxes or deductions?",
    a: "No. The calculator typically shows gross estimates. Taxes, insurance, and deductions depend on your country and employer."
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
longDescription: 'The Global Tax Calculator helps you estimate income tax based on country-specific tax brackets and commonly applied rules. It’s especially useful for expats, remote workers, freelancers, and international employees who need a quick understanding of how income tax may differ from one country to another.\n\nAfter selecting a country and entering your annual income, the calculator provides an estimated tax amount using publicly referenced tax brackets. Because tax laws vary by location and can change due to deductions, residency status, and local regulations, the result should be treated as an estimate rather than legal advice. It’s ideal for early planning, comparisons, and general financial awareness.\n\nIf you are comparing salary offers across countries, the <a href="/tools/salary-to-hourly-calculator" title="Salary to Hourly Calculator">Salary to Hourly Calculator</a> can convert annual income into hourly or monthly estimates. For international income comparisons, the <a href="/tools/currency-converter" title="Currency Converter">Currency Converter</a> helps translate earnings into your preferred currency.',

faqs: [
  {
    q: "How does the Global Tax Calculator work?",
    a: "It estimates your income tax based on the selected country's tax brackets and your annual salary."
  },
  {
    q: "Are tax rates updated?",
    a: "Yes, the calculator uses commonly referenced tax brackets. However, always confirm with official sources."
  },
  {
  q: "Does this include deductions or personal allowances?",
  a: "No. The calculator provides a general estimate based on standard tax brackets. Deductions, allowances, and special rules may change the final tax payable."
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
longDescription: 'The Investment Return Calculator estimates how much your investment can grow over time based on the initial amount, expected rate of return, and investment duration. It’s useful for evaluating savings plans, fixed-income products, and long-term investments where you want a clear picture of potential profit and final value.\n\nBy adjusting the rate or duration, you can easily compare different return scenarios and understand how time and growth impact results. The calculator provides a simple, readable breakdown that helps with planning and decision-making, while keeping the math transparent and easy to interpret.\n\nFor growth calculations involving compounding frequency such as monthly or daily interest, the <a href="/tools/compound-interest-calculator" title="Compound Interest Calculator">Compound Interest Calculator</a> offers more detailed projections. If you are investing monthly through mutual funds, the <a href="/tools/sip-calculator" title="SIP Calculator">SIP Calculator</a> may be more suitable.',

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
longDescription: "The Word Counter tool instantly analyzes your text and displays the number of words, characters, sentences, and paragraphs in real time. It’s ideal for writers, students, journalists, SEO specialists, and anyone working with text limits or formatting requirements.\n\nSimply type or paste your content into the text box and watch the counts update automatically. This makes it easy to meet academic word limits, optimize SEO content length, track social media character counts, or review writing structure quickly and accurately on any device.",

faqs: [
  {
    q: "What does the Word Counter tool do?",
    a: "The Word Counter counts words, characters, sentences and paragraphs instantly as you type or paste text."
  },
  {
    q: "Is the Word Counter accurate?",
    a: "Yes, it uses real-time text analysis to provide accurate counts for all text elements."
  },
  {
  q: "Does the Word Counter count spaces and punctuation?",
  a: "Characters are counted both with and without spaces, while punctuation is included in character counts but not treated as separate words."
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
longDescription: "The Character Counter instantly counts characters in your text in real time, both with spaces and without spaces. It’s especially useful when writing for platforms with strict limits—like social media posts, meta descriptions, SMS messages, form fields, or ad copy—where a few extra characters can cause content to be rejected or cut off.\n\nPaste or type your text and the tool updates counts automatically as you edit. Because different platforms treat spacing and emojis differently, seeing both totals helps you stay within limits with confidence. It’s fast, simple, and works smoothly on desktop and mobile.",

faqs: [
  {
    q: "What is a Character Counter used for?",
    a: "A Character Counter measures the number of characters with or without spaces, useful for social media limits, essays and SEO."
  },
  {
    q: "Does it count emojis?",
    a: "Yes, emojis and symbols are counted as characters as well."
  },
  {
  q: "What’s the difference between characters with spaces and without spaces?",
  a: "With spaces counts every letter, symbol, and space. Without spaces excludes spaces, which some platforms or requirements may prefer."
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
longDescription: "The Case Converter helps you change text formatting instantly without retyping. You can convert content into uppercase, lowercase, sentence case, title case, and other common formats used in writing, documentation, and publishing. It’s ideal for cleaning copied text, formatting headings, preparing content for social media, or standardizing text in reports and spreadsheets.\n\nJust paste your text, select the case style you want, and copy the converted result. This tool saves time and reduces mistakes, especially when handling long paragraphs or repeated formatting tasks across multiple pieces of content.",

faqs: [
  {
    q: "What can I do with the Case Converter?",
    a: "You can convert text into uppercase, lowercase, sentence case, title case and other formatting styles instantly."
  },
  {
    q: "Does the Case Converter support long text?",
    a: "Yes, it can convert text of any length instantly without slowing down."
  },
  {
  q: "Will converting case change punctuation or spacing?",
  a: "No. It changes letter casing only, while keeping your original spacing, punctuation, and numbers unchanged."
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
longDescription: "The Remove Extra Spaces tool cleans text by fixing unwanted spacing issues such as double spaces, leading spaces, trailing spaces, and inconsistent gaps between words. It’s useful when you copy text from PDFs, websites, emails, or documents where formatting often introduces messy spacing that reduces readability or breaks layouts.\n\nPaste your content and the tool normalizes spacing while keeping your words and sentences intact. The result is cleaner text you can confidently use for emails, articles, forms, SEO work, or any place where formatting consistency matters.",

faqs: [
  {
    q: "What does the Remove Extra Spaces tool do?",
    a: "It automatically removes double spaces, leading spaces and trailing spaces from text to make it clean and readable."
  },
  {
    q: "Will it affect the original meaning of text?",
    a: "No, only unnecessary spaces are removed. All words and sentences remain unchanged."
  },
  {
  q: "Does it remove line breaks too?",
  a: "No. This tool focuses on spacing within lines. If you want to remove newlines, use the Remove Line Breaks tool."
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
longDescription: "The Remove Line Breaks tool converts text with unwanted newlines into a cleaner format—typically a single continuous paragraph. This is especially helpful when text is copied from PDFs, web pages, or scanned documents where line breaks appear at the end of every line and make the content hard to reuse.\n\nPaste your text, choose your preferred cleanup option, and generate a version without extra line breaks. You can then copy the cleaned output into emails, documents, blog posts, or forms without broken formatting. It’s quick, reliable, and designed for both short and long text.",

faqs: [
  {
    q: "Why use a Remove Line Breaks tool?",
    a: "It merges multiple lines into a single paragraph by removing newline characters."
  },
  {
    q: "Can I format text after removing line breaks?",
    a: "Yes, you can reformat or copy the cleaned text anywhere you need."
  },
  {
  q: "Will it remove paragraph breaks as well?",
  a: "Depending on the selected option, it can merge lines only or remove most breaks. Choose the mode that fits your formatting goal."
},
{
  q: "Will it remove paragraph breaks as well?",
  a: "Depending on the selected option, it can merge lines only or remove most breaks. Choose the mode that fits your formatting goal."
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
longDescription: "The Text Reverser lets you reverse text instantly by characters, by words, or by full sentence order. It’s a fun tool for creative writing and puzzles, but also practical for developers and testers who need reversed strings to validate input handling, UI rendering, or edge cases.\n\nPaste your text, choose how you want it reversed, and the tool generates the output immediately. You can copy the reversed result for experiments, formatting checks, or just for creative content. It works in real time and supports both short and long text.",

faqs: [
  {
    q: "What does the Text Reverser do?",
    a: "It reverses text direction by characters, words or complete sentences with one click."
  },
  {
    q: "Is it useful for coding or cryptography?",
    a: "Yes, developers often use it for testing, debugging and creating reversed output."
  },
  {
  q: "Does it reverse letters or word order?",
  a: "You can choose: reverse by characters (letters), reverse by words, or reverse sentence order depending on the mode."
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
longDescription: "The Remove Duplicate Lines tool cleans lists by removing repeated lines while keeping only unique entries. It’s useful for cleaning keyword lists, email lists, logs, exported data, search queries, and any text where duplicates cause noise or incorrect results.\n\nPaste your list (one item per line) and the tool removes duplicate entries while preserving the original order of the first occurrences. This makes the output easier to use in spreadsheets, SEO workflows, automation scripts, and reporting without breaking your existing sequence.",

faqs: [
  {
    q: "What is the purpose of the Remove Duplicate Lines tool?",
    a: "It removes repeated lines from your text to create a clean list of unique items."
  },
  {
    q: "Does it preserve line order?",
    a: "Yes, the tool keeps the original order of lines while removing duplicates."
  },
  {
  q: "Is the comparison case-sensitive?",
  a: "Most duplicate removers treat 'Apple' and 'apple' as different lines unless a case-insensitive option is provided. If you need strict normalization, convert case first."
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
longDescription: "The Find & Replace tool helps you quickly search for specific words or phrases in a block of text and replace them with new content. It’s especially useful when editing long documents, updating repeated terms, fixing typos at scale, or making consistent wording changes across articles, emails, or data exports.\n\nInstead of manually editing line by line, you can replace all matching instances in one action. This saves time, reduces errors, and ensures consistency—making it ideal for writers, editors, developers, and SEO professionals working with large amounts of text.",

faqs: [
  {
    q: "How does the Find & Replace tool work?",
    a: "It searches text for a specific word or phrase and replaces it with your chosen alternative instantly."
  },
  {
    q: "Does it support replacing multiple terms?",
    a: "Yes, simply perform multiple replacements one after another."
  },
  {
  q: "Does it replace all occurrences at once?",
  a: "Yes, the tool replaces every matching instance of the selected word or phrase in the text."
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
longDescription: "The Capitalize Sentences tool automatically fixes sentence capitalization by ensuring the first letter of every sentence is uppercase. It’s ideal for cleaning text copied from chats, notes, transcripts, or drafts where proper sentence formatting is missing.\n\nSimply paste your text and the tool corrects capitalization without changing words, punctuation, or spacing. This helps improve readability and presentation for essays, blog posts, emails, and documents without manual editing.",

faqs: [
  {
    q: "What is the Capitalize Sentences tool used for?",
    a: "It automatically capitalizes the first letter of each sentence in your text."
  },
  {
    q: "Does it change any other text formatting?",
    a: "No, punctuation and words remain unchanged except for sentence capitalization."
  },
  {
  q: "Does it capitalize proper nouns?",
  a: "No. The tool focuses on sentence starts only. Proper nouns should be reviewed separately."
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
longDescription: "The Text Sorter tool lets you rearrange lines of text in a specific order—alphabetical, reverse alphabetical, numerical, or random. It’s commonly used for sorting lists, names, keywords, data entries, or log files without altering the content itself.\n\nPaste your text (one item per line), choose a sorting method, and instantly get a reordered list. Because only the order changes and not the text, it’s a safe and fast way to organize information for analysis, presentation, or cleanup.",

faqs: [
  {
    q: "What can I do with the Text Sorter?",
    a: "You can sort text lines alphabetically, reverse alphabetically, numerically or randomly."
  },
  {
    q: "Does it change the content of lines?",
    a: "Only the order of lines changes; the content stays the same."
  },
  {
  q: "Can it sort numbers correctly?",
  a: "Yes, numeric sorting arranges values based on numerical order instead of alphabetical order."
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
longDescription: "The Lorem Ipsum Generator creates placeholder text that designers and developers use to preview layouts before real content is ready. It helps focus on visual design, spacing, typography, and structure without being distracted by meaningful text.\n\nYou can generate placeholder content by paragraphs, words, or characters depending on your needs. This makes the tool useful for website mockups, UI testing, print layouts, and content templates across different projects.",

faqs: [
  {
    q: "What does the Lorem Ipsum Generator create?",
    a: "It generates placeholder dummy text used for design, testing and content layouts."
  },
  {
    q: "Can I choose the amount of text?",
    a: "Yes, you can generate as many paragraphs, words or characters as you want."
  },
  {
  q: "Can I use the generated text commercially?",
  a: "Yes. Lorem ipsum text is generic placeholder content and can be used freely in any project."
}

],
howtoSteps: [
  "Choose how many paragraphs, words or characters you want.",
  "Click Generate to create lorem ipsum text.",
  "Copy or use the placeholder text in your projects."
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
longDescription: "The Character Frequency Counter analyzes your text and shows how many times each character appears, including letters, numbers, symbols, and spaces. It’s useful for text analysis, data validation, cryptography basics, and understanding character distribution patterns.\n\nAfter pasting your text, the tool instantly produces a frequency breakdown that can be used for academic research, programming tasks, statistical checks, or language analysis. It works for both short strings and large blocks of text.",

faqs: [
  {
    q: "What is the purpose of the Character Frequency Counter?",
    a: "It counts how many times each character appears in your text, including letters, numbers and symbols."
  },
  {
    q: "Who uses this tool?",
    a: "Students, linguists, developers and cryptography enthusiasts use it for analysis."
  },
  {
  q: "Are spaces included in the analysis?",
  a: "Yes, spaces and special characters are counted unless filtered out by the tool."
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
longDescription: "The Slug Generator converts any text into a clean, SEO-friendly URL slug that’s suitable for web pages, blog posts, and content management systems. It removes special characters, replaces spaces with hyphens, and formats text in a way search engines and browsers prefer.\n\nThis tool is especially helpful for bloggers, developers, and SEO professionals who want consistent, readable URLs without manual formatting. The generated slugs are lowercase, simple, and optimized for clarity and search visibility.",

faqs: [
  {
    q: "What is the Slug Generator used for?",
    a: "It converts any text into a clean, SEO-friendly URL slug by removing spaces and special characters."
  },
  {
    q: "Are the generated slugs SEO-friendly?",
    a: "Yes, all slugs are formatted according to SEO best practices for URLs."
  },
  {
  q: "Can I edit the slug after generating it?",
  a: "Yes. The generated slug can be copied and customized further if you need specific wording."
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
longDescription: "The Image Compressor reduces image file size while preserving visual quality, making images faster to load and easier to share. It’s ideal for websites, blogs, online stores, emails, and social media where large images slow down performance or exceed upload limits.\n\nSimply upload your image, choose a compression level, and download the optimized version instantly. The tool uses smart compression techniques to remove unnecessary data without visibly degrading quality, helping improve page speed, storage efficiency, and user experience.",

faqs: [
  {
    q: "How does the Image Compressor work?",
    a: "The Image Compressor reduces file size by optimizing image data while maintaining visual quality."
  },
  {
    q: "Will compressing an image reduce quality?",
    a: "No, the tool uses smart compression to reduce file size without noticeable quality loss."
  },
  {
  q: "Is image compression safe for websites?",
  a: "Yes. Compressed images load faster and are recommended for better performance and SEO."
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
longDescription: "The Image Resizer lets you change image dimensions quickly without complex software. It’s perfect for preparing images for websites, social media platforms, profile photos, presentations, and print layouts that require specific sizes or aspect ratios.\n\nUpload your image, enter custom width and height values or select a preset size, and resize instantly. The tool maintains image clarity as much as possible, making it easy to adapt visuals for different platforms and use cases.",

faqs: [
  {
    q: "What can I do with the Image Resizer?",
    a: "You can resize any image to custom dimensions or preset aspect ratios in seconds."
  },
  {
    q: "Does resizing affect image quality?",
    a: "Only minimal quality changes occur, and the tool preserves as much clarity as possible."
  },
  {
  q: "Can I keep the aspect ratio while resizing?",
  a: "Yes. Maintaining the aspect ratio prevents image distortion when resizing."
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
longDescription: "The Image Cropper helps you remove unwanted areas from an image and focus on the part that matters. It’s commonly used for profile photos, thumbnails, social media posts, banners, and product images where precise framing is important.\n\nUpload your image, drag the crop box to select the desired area, and crop with one click. You can crop freely or follow fixed aspect ratios, then download a clean, perfectly framed image ready for use.",

faqs: [
  {
    q: "How do I crop an image?",
    a: "Upload an image, select the area you want to keep, and crop it instantly with one click."
  },
  {
    q: "Which image formats are supported?",
    a: "PNG, JPG, WEBP and most standard image formats are supported."
  },
  {
  q: "Does cropping reduce image quality?",
  a: "No. Cropping removes unwanted areas but keeps the quality of the remaining image intact."
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
longDescription: "The Image Blur Tool allows you to blur entire images or specific areas for privacy, security, or creative purposes. It’s useful for hiding sensitive information, faces, license plates, or creating aesthetic background effects for social media and design work.\n\nUpload your image, adjust the blur intensity, and apply the effect instantly. You can control how strong the blur appears and download the final image in seconds without installing any software.",

faqs: [
  {
    q: "What does the Image Blur Tool do?",
    a: "It allows you to blur backgrounds or specific areas of an image for privacy or creative effect."
  },
  {
    q: "Can I control the blur intensity?",
    a: "Yes, you can adjust the blur strength to achieve your desired effect."
  },
  {
  q: "Is blurring permanent after download?",
  a: "Yes. Once you download the image, the blur effect is permanently applied."
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
longDescription: "The Image Rotate Tool lets you rotate or flip images quickly to correct orientation or adjust layout. It’s especially useful for photos taken on mobile devices, scanned documents, and images that appear sideways or upside down after upload.\n\nUpload your image and rotate it by 90°, 180°, or 270°, or flip it horizontally or vertically. Changes apply instantly, allowing you to download a correctly oriented image without editing software.",

faqs: [
  {
    q: "What does the Image Rotate Tool do?",
    a: "It allows you to rotate images by 90°, 180°, or 270°, or flip them horizontally or vertically."
  },
  {
    q: "Does rotating an image affect quality?",
    a: "No. Rotation and flipping do not reduce image quality."
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
longDescription: "The Image Format Converter lets you change images between common formats such as JPG, PNG, WEBP, GIF, and more without installing any software. It’s useful when different platforms require specific formats—for example, JPG for smaller file sizes, PNG for transparency, or WEBP for modern web performance.\n\nUpload your image, select the desired output format, and convert instantly. The tool preserves visual quality as much as possible while adapting to the characteristics of each format, making it ideal for web publishing, design work, and everyday image compatibility.",

faqs: [
  {
    q: "Which formats can I convert images to?",
    a: "You can convert images to JPG, PNG, WEBP, GIF and other popular formats."
  },
  {
    q: "Does converting an image change its quality?",
    a: "Quality remains high unless converting to a format with compression like JPG."
  },
  {
  q: "Which format should I choose for websites?",
  a: "WEBP is usually best for modern websites due to smaller file sizes, while JPG and PNG remain widely supported."
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
longDescription: "The Image Color Picker allows you to extract exact color values from any image by clicking directly on it. It instantly displays the color in HEX, RGB, and HSL formats, making it easy to reuse colors in design, branding, and development projects.\n\nUpload an image and click anywhere to sample a color with pixel-level accuracy. This tool is especially helpful for designers matching brand colors, developers implementing UI elements, or anyone needing precise color codes from photos, screenshots, or graphics.",

faqs: [
  {
    q: "How does the Image Color Picker work?",
    a: "Upload an image and click any point to get the exact HEX, RGB and HSL color values."
  },
  {
    q: "Is this tool useful for designers?",
    a: "Yes, it’s ideal for designers, developers and anyone needing accurate color codes."
  },
  {
  q: "Can I pick colors from uploaded screenshots or photos?",
  a: "Yes. Any uploaded image can be used to extract accurate color values."
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
longDescription: "The Image to Base64 Converter transforms image files into Base64-encoded strings that can be embedded directly into HTML, CSS, or JSON. This is commonly used when you want to include images inline without relying on external image files or URLs.\n\nUpload an image and the tool generates a Base64 representation instantly. Developers often use this method for small icons, email templates, API responses, or prototypes where bundling assets into a single file is convenient.",

faqs: [
  {
    q: "What does the Image to Base64 Converter do?",
    a: "It converts any image into a Base64 encoded string for embedding into CSS, HTML or JSON."
  },
  {
    q: "Is Base64 safe to use?",
    a: "Yes, Base64 is widely used for embedding images without external file hosting."
  },
  {
  q: "Does Base64 increase file size?",
  a: "Yes. Base64 encoding increases file size compared to the original image, so it’s best used for small assets."
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
longDescription: "The Base64 to Image Converter decodes Base64-encoded image strings back into normal image files you can view and download. It’s useful when working with data-URIs, API responses, or embedded images that need to be restored to standard formats.\n\nPaste your Base64 string into the tool and convert it instantly into a downloadable image. The output format depends on the original encoding, and the tool supports common image types such as JPG and PNG.",

faqs: [
  {
    q: "How do I convert Base64 back to an image?",
    a: "Paste the Base64 string into the tool and it will generate a downloadable image instantly."
  },
  {
    q: "Which image formats are supported?",
    a: "Most Base64-encoded images output as PNG or JPG depending on the original encoding."
  },
  {
  q: "Do I need the full data URI or just the Base64 string?",
  a: "The tool typically works with the Base64 portion, but full data URIs are also supported in most cases."
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
 longDescription: "The Instagram Bio Generator helps you create short, creative, and niche-specific bio ideas that fit Instagram’s character limits. A strong bio makes a powerful first impression and clearly communicates who you are, what you do, or what followers can expect from your content.\n\nSimply enter your niche or keywords, choose a style or tone, and generate multiple bio ideas instantly. The tool is useful for personal profiles, creators, businesses, influencers, and brand pages looking to refresh or optimize their Instagram presence.",

faqs: [
  {
    q: "Can I use the generated bio directly on Instagram?",
    a: "Yes. All generated bios are ready to copy and paste directly into your Instagram profile."
  },
  {
    q: "Are the bios optimized for character limits?",
    a: "Yes, the bios are designed to fit within Instagram’s bio length limits."
  }
],

  howtoSteps: ["Enter niche/keywords.", "Pick style/tone.", "Generate bios and copy."]
},
{
  title: "Instagram Caption Generator",
  slug: "instagram-caption-generator",
  category: "Social Media Tools",
  description: "Generate captions for Instagram posts and reels instantly.",
  seoTitleTemplate: "{title} — Instagram Caption Ideas",
  seoDescriptionTemplate: "Use {title} to generate engaging captions for Instagram content. Free and fast.",
  longDescription: "The Instagram Caption Generator creates engaging caption ideas tailored to your topic, niche, or tone. Captions play a key role in engagement by encouraging likes, comments, and shares while reinforcing your content message.\n\nEnter a keyword or topic, choose a tone (fun, professional, motivational, etc.), and generate caption ideas instantly. This tool is ideal for posts, reels, carousels, and brand promotions.",

faqs: [
  {
    q: "Are captions suitable for reels and posts?",
    a: "Yes. Generated captions can be used for reels, posts, and carousel content."
  },
  {
    q: "Can I regenerate captions?",
    a: "Yes. You can generate multiple variations until you find the perfect caption."
  }
],

  howtoSteps: ["Enter topic/keywords.", "Choose tone.", "Generate captions and copy."]
},
{
  title: "Instagram Fancy Font Generator",
  slug: "instagram-font-generator",
  category: "Social Media Tools",
  description: "Convert text into stylish Instagram-ready fonts.",
  seoTitleTemplate: "{title} — Instagram Fancy Font Generator",
  seoDescriptionTemplate: "Use {title} to generate stylish fonts for Instagram bios, captions and posts.",
  longDescription: "The Instagram Fancy Font Generator converts normal text into stylish, decorative fonts that can be used in Instagram bios, captions, comments, and highlights. Fancy fonts help your profile stand out visually and attract attention.\n\nType your text, choose from a variety of font styles, and copy the formatted version instantly. All fonts are Unicode-based, meaning they work across Instagram and most modern devices.",

faqs: [
  {
    q: "Do these fonts work on Instagram?",
    a: "Yes. The generated fonts use Unicode characters supported by Instagram."
  },
  {
    q: "Can I use them in bios and captions?",
    a: "Yes, they work in bios, captions, comments, and highlights."
  }
],

  howtoSteps: ["Type your text.", "Pick a font style.", "Copy and paste to Instagram."]
},
{
  title: "Open Graph Meta Tag Generator",
  slug: "open-graph-meta-generator",
  category: "Social Media Tools",
  description: "Generate OG meta tags quickly for better link previews.",
  seoTitleTemplate: "{title} — Open Graph Meta Tag Generator",
  seoDescriptionTemplate: "Use {title} to create Open Graph meta tags and improve how your links appear on social platforms.",
  longDescription: "The Open Graph Meta Tag Generator helps you create OG meta tags that control how your links appear when shared on social platforms like Facebook, LinkedIn, WhatsApp, and Twitter/X. Proper Open Graph tags improve click-through rates and visual consistency.\n\nEnter your page title, description, image URL, and page URL, then generate ready-to-use meta tags. These tags can be copied directly into your website’s HTML head section.",

faqs: [
  {
    q: "Why are Open Graph tags important?",
    a: "They control link previews, including title, description, and image, when your page is shared on social media."
  },
  {
    q: "Do these tags affect SEO?",
    a: "Indirectly. While not a ranking factor, better previews can increase engagement and clicks."
  }
],

  howtoSteps: ["Enter title/description/image.", "Generate tags.", "Copy into HTML head."]
},
{
  title: "Social Share Link Builder",
  slug: "social-share-link-builder",
  category: "Social Media Tools",
  description: "Create share links for WhatsApp, Facebook, Twitter/X, LinkedIn and more.",
  seoTitleTemplate: "{title} — Build Social Share Links",
  seoDescriptionTemplate: "Use {title} to generate ready-to-use share URLs for major social platforms.",
 longDescription: "The Social Share Link Builder creates ready-to-use sharing URLs for popular platforms such as WhatsApp, Facebook, Twitter/X, LinkedIn, and more. These links allow users to share your content with a single click.\n\nEnter your page URL, choose a platform, and instantly generate a share link. This tool is useful for websites, blogs, email campaigns, landing pages, and call-to-action buttons.",

faqs: [
  {
    q: "Can I use these links on websites and emails?",
    a: "Yes. The generated links work on websites, emails, and messaging apps."
  },
  {
    q: "Do share links track analytics?",
    a: "The links themselves don’t track analytics, but platform analytics may record engagement."
  }
],

  howtoSteps: ["Enter your page URL.", "Pick platform.", "Copy generated share link."]
},

{
  title: "TikTok Bio Generator",
  slug: "tiktok-bio-generator",
  category: "Social Media Tools",
  description: "Generate short, catchy TikTok bios using a keyword.",
  seoTitleTemplate: "TikTok Bio Generator — Create Viral TikTok Bios",
  seoDescriptionTemplate: "Create viral TikTok bio ideas instantly using a keyword. Free and easy to use.",
longDescription: "The TikTok Bio Generator creates short, catchy bio ideas designed to fit TikTok’s limited profile space. A strong bio helps communicate your niche quickly and encourages visitors to follow your account.\n\nEnter a keyword or niche and generate multiple bio ideas instantly. The tool is ideal for creators, influencers, businesses, and personal profiles looking to improve profile clarity and appeal.",

faqs: [
  {
    q: "Are TikTok bios limited in length?",
    a: "Yes. The tool generates bios that fit TikTok’s character limits."
  },
  {
    q: "Can I regenerate different bio styles?",
    a: "Yes. You can generate multiple variations until you find the right fit."
  }
],

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
 longDescription: "The TikTok Caption Generator produces caption ideas designed to increase engagement and visibility on TikTok. Captions help provide context, encourage interaction, and support hashtag strategy.\n\nEnter a keyword related to your video content and generate caption ideas instantly. This tool is useful for creators aiming to improve reach and consistency.",

faqs: [
  {
    q: "Do captions affect TikTok reach?",
    a: "Yes. Well-written captions can improve engagement and content discoverability."
  },
  {
    q: "Can I edit captions after generating?",
    a: "Yes. Generated captions can be customized freely."
  }
],

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
  longDescription: "The TikTok Hashtag Generator helps you discover trending and niche-relevant hashtags to improve content reach and visibility. Hashtags help TikTok understand your content and show it to the right audience.\n\nEnter your niche or keyword and generate hashtag sets instantly. The tool is ideal for creators, marketers, and brands aiming to optimize discoverability.",

faqs: [
  {
    q: "How many hashtags should I use?",
    a: "There is no fixed rule, but a focused set of relevant hashtags usually performs better than excessive tagging."
  },
  {
    q: "Are hashtags updated in real time?",
    a: "Hashtag suggestions are based on common trends and relevance, but real-time popularity may vary."
  }
],

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
  longDescription: "The Tweet Generator lets you create realistic tweet previews for mockups, demos, presentations, or creative projects. It allows customization of usernames, content, likes, and retweets to simulate real tweets.\n\nThis tool is commonly used by designers, marketers, educators, and content creators who need realistic Twitter/X visuals without posting live content.",

faqs: [
  {
    q: "Does this post tweets on Twitter/X?",
    a: "No. This tool only generates visual previews and does not publish real tweets."
  },
  {
    q: "Can I use the preview in presentations?",
    a: "Yes. Generated previews are ideal for demos, mockups, and slides."
  }
],

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
  longDescription: "The Tweet Thread Generator helps you structure multi-tweet threads around a topic or keyword. Threads are effective for storytelling, education, and long-form ideas on Twitter/X.\n\nEnter a topic and generate a sequence of connected tweets that flow naturally. This tool is useful for creators, educators, and marketers building informative or viral threads.",

faqs: [
  {
    q: "Can I edit the generated thread?",
    a: "Yes. All tweets can be customized before posting."
  },
  {
    q: "Is this suitable for Twitter/X?",
    a: "Yes. Threads are formatted for Twitter/X posting."
  }
],

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
  longDescription: "The Twitter Bio Generator creates clean, professional, and niche-specific bio ideas for Twitter/X profiles. A well-written bio helps establish credibility and attract the right audience.\n\nEnter a keyword or niche and generate multiple bio ideas instantly. This tool is useful for professionals, creators, startups, and personal brands looking to refine their online presence.",

faqs: [
  {
    q: "Are bios optimized for Twitter/X limits?",
    a: "Yes. Generated bios are designed to fit Twitter/X character limits."
  },
  {
    q: "Can I generate multiple variations?",
    a: "Yes. You can generate and compare different styles easily."
  }
],

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
 longDescription: "The Twitter Hashtag Generator helps you discover relevant and trending hashtags for Twitter/X posts. Hashtags improve tweet visibility by helping content reach users who follow or search for specific topics.\n\nEnter a keyword related to your tweet and generate a list of suggested hashtags instantly. This tool is useful for creators, marketers, and brands looking to increase engagement, impressions, and discoverability on Twitter/X.",

faqs: [
  {
    q: "How do hashtags help on Twitter/X?",
    a: "Hashtags categorize tweets and make them easier to discover by users interested in those topics."
  },
  {
    q: "How many hashtags should I use in a tweet?",
    a: "Most experts recommend using one to three relevant hashtags for best readability and engagement."
  }
],

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
longDescription: "The YouTube Description Generator creates SEO-friendly video descriptions designed to improve search visibility and viewer understanding. A well-written description helps YouTube understand your content and encourages users to watch longer.\n\nEnter your video keyword or topic and generate a structured description instantly. This tool is useful for creators who want to save time, improve rankings, and maintain consistency across multiple videos.",

faqs: [
  {
    q: "Do video descriptions affect YouTube SEO?",
    a: "Yes. Descriptions help YouTube understand your video content and can improve discoverability."
  },
  {
    q: "Can I edit the generated description?",
    a: "Yes. The generated text can be customized to match your voice or include links and timestamps."
  }
],

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
 longDescription: "The YouTube Tags Generator helps you create optimized tag lists that support video discovery and relevance. While tags are not the most important ranking factor, they still help YouTube understand context, especially for new or niche content.\n\nEnter a keyword related to your video and generate a set of relevant tags instantly. This tool is useful for improving content categorization and consistency across your channel.",

faqs: [
  {
    q: "Are YouTube tags still useful?",
    a: "Tags play a minor role but help with spelling variations and content context."
  },
  {
    q: "Should I copy all generated tags?",
    a: "It’s best to select the most relevant tags rather than using every suggestion."
  }
],

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
  longDescription: "The YouTube Title Generator helps you create engaging and clickable video titles based on your topic or keyword. Titles are one of the most important factors influencing click-through rate and viewer interest.\n\nEnter your video topic and generate multiple title ideas instantly. This tool is ideal for creators aiming to improve visibility, attract viewers, and test different headline styles before publishing.",

faqs: [
  {
    q: "Do titles affect YouTube performance?",
    a: "Yes. Strong titles can significantly increase click-through rates and overall engagement."
  },
  {
    q: "Can I modify the generated titles?",
    a: "Yes. Titles can be edited freely to better match your content."
  }
],

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
longDescription: "The YouTube Thumbnail Downloader lets you download video thumbnails directly from YouTube in multiple resolutions, including HD, Full HD, and 4K. Thumbnails are useful for previews, presentations, research, design mockups, or content analysis.\n\nSimply paste the YouTube video URL and the tool instantly fetches all available thumbnail sizes. No account or login is required, and downloads are fast and straightforward across all devices.",

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
longDescription: "The Instagram Hashtag Generator helps you discover relevant and trending hashtags based on your content keyword. Hashtags play a key role in improving reach, visibility, and engagement by helping Instagram categorize your posts and show them to interested audiences.\n\nEnter a keyword related to your post and generate hashtag suggestions instantly. This tool is useful for creators, influencers, businesses, and marketers who want to expand reach without manually researching hashtags.",

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
  longDescription: "The Images to PDF tool lets you combine multiple images into a single PDF file quickly and easily. It’s useful for creating documents from scanned pages, photos, screenshots, or design files that need to be shared or archived in one file.\n\nUpload your images, arrange them in the desired order, and generate a PDF instantly. The tool supports common image formats and produces a clean, shareable PDF suitable for work, school, or personal use.",

faqs: [
  {
    q: "Which image formats are supported?",
    a: "Common formats such as JPG, PNG, and WEBP are supported."
  },
  {
    q: "Can I rearrange images before converting?",
    a: "Yes. You can change the order of images before generating the PDF."
  }
],

  howtoSteps: ["Upload images.", "Arrange order if needed.", "Download the PDF."]
},
{
  title: "Merge PDF",
  slug: "merge-pdfs",
  category: "PDF Tools",
  description: "Merge multiple PDF files into one document.",
  seoTitleTemplate: "{title} — Merge PDF Files Online",
  seoDescriptionTemplate: "Use {title} to merge PDFs into one file. Fast, free and works on any device.",
  longDescription: "The Merge PDF tool allows you to combine multiple PDF documents into a single file. It’s useful for consolidating reports, contracts, invoices, scanned documents, or study materials into one organized PDF.\n\nUpload your PDF files, arrange them in the correct order, and merge them instantly. The resulting file keeps the original layout and quality while simplifying storage and sharing.",

faqs: [
  {
    q: "Will merging PDFs affect formatting?",
    a: "No. Each PDF keeps its original formatting and layout."
  },
  {
    q: "Is there a limit on the number of PDFs?",
    a: "Limits depend on file size and browser capabilities, but most common use cases are supported."
  }
],

  howtoSteps: ["Upload PDFs.", "Arrange order.", "Download merged PDF."]
},
{
  title: "Protect PDF",
  slug: "protect-pdf",
  category: "PDF Tools",
  description: "Add a password to protect your PDF file.",
  seoTitleTemplate: "{title} — Password Protect a PDF",
  seoDescriptionTemplate: "Use {title} to add password protection to PDFs. Secure and easy.",
  longDescription: "The Protect PDF tool lets you add password protection to a PDF file, helping secure sensitive or confidential information. It’s ideal for documents such as contracts, reports, invoices, and personal records.\n\nUpload your PDF, set a password, and download the protected version instantly. Once protected, the PDF can only be opened by users who know the password.",

faqs: [
  {
    q: "What does password protection do?",
    a: "It prevents unauthorized users from opening the PDF without the correct password."
  },
  {
    q: "Can I remove the password later?",
    a: "Yes, you can remove protection using an unlock tool if you know the password."
  }
],

  howtoSteps: ["Upload PDF.", "Enter password.", "Download protected PDF."]
},
{
  title: "Split PDF",
  slug: "split-pdf",
  category: "PDF Tools",
  description: "Split a PDF into separate pages or page ranges.",
  seoTitleTemplate: "{title} — Split PDF Pages Online",
  seoDescriptionTemplate: "Split PDF pages instantly with {title}. Extract specific page ranges quickly.",
  longDescription: "The Split PDF tool allows you to divide a PDF into separate pages or extract specific page ranges. It’s useful when you only need part of a document instead of sharing or storing the entire file.\n\nUpload your PDF, select how you want to split it, and download the resulting files instantly. This makes document handling faster and more efficient.",

faqs: [
  {
    q: "Can I extract only certain pages?",
    a: "Yes. You can split by page ranges or individual pages."
  },
  {
    q: "Will the original PDF change?",
    a: "No. The original file remains unchanged."
  }
],

  howtoSteps: ["Upload PDF.", "Choose split range.", "Download split files."]
},
{
  title: "Unlock PDF",
  slug: "unlock-pdf",
  category: "PDF Tools",
  description: "Remove password protection from a PDF (when you have permission).",
  seoTitleTemplate: "{title} — Unlock a PDF File Online",
  seoDescriptionTemplate: "Use {title} to unlock PDFs when you know the password. Fast and secure.",
  longDescription: "The Unlock PDF tool removes password protection from a PDF file when you have permission to do so. It’s useful when you need to edit, print, or share a document that you own but is locked.\n\nUpload the protected PDF, enter the correct password, and download an unlocked version instantly. This tool should only be used on files you are authorized to unlock.",

faqs: [
  {
    q: "Is it legal to unlock a PDF?",
    a: "You should only unlock PDFs that you own or have permission to modify."
  },
  {
    q: "Do I need the password?",
    a: "Yes. The correct password is required to unlock the PDF."
  }
],

  howtoSteps: ["Upload PDF.", "Enter password.", "Download unlocked PDF."]
},

{
  title: "PDF Compressor",
  slug: "pdf-compressor",
  category: "PDF Tools",
  description: "Compress PDF files online without losing quality. Fast, free, and secure.",
  seoTitleTemplate: "{title} — Compress PDF Files Online",
  seoDescriptionTemplate: "Compress PDF files online for free. Reduce file size without losing quality.",
 longDescription: "The PDF Compressor reduces the file size of PDF documents while preserving readability and visual quality. It’s ideal for sharing large PDFs via email, uploading to websites, or saving storage space.\n\nUpload your PDF, choose a compression level, and download the optimized file. The tool balances file size reduction with clarity, making it suitable for documents containing text, images, or both.",

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
  longDescription: "The Extract Images from PDF tool pulls all embedded images from a PDF file automatically. It’s useful when you need original images for reuse, editing, archiving, or design work.\n\nUpload your PDF and extract all images in one step. The images are downloaded separately, saving time compared to manual extraction.",

faqs: [
  {
    q: "Are images extracted in original quality?",
    a: "Yes. Images are extracted in their original resolution as stored in the PDF."
  },
  {
    q: "Can I extract images from scanned PDFs?",
    a: "Only images embedded in the PDF are extracted. Scanned pages may require OCR tools."
  }
],

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
 longDescription: "The PDF Metadata Viewer displays hidden information stored inside a PDF file, such as author name, creation date, modification date, and software used. This information is useful for document auditing, research, and file verification.\n\nUpload a PDF and view its metadata instantly without modifying the file. The tool is read-only and does not change document content.",

faqs: [
  {
    q: "Does viewing metadata change the PDF?",
    a: "No. The file is not modified in any way."
  },
  {
    q: "Why is PDF metadata important?",
    a: "Metadata helps verify document origin, history, and authenticity."
  }
],

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
 longDescription: "The PDF Page Numbering Tool allows you to add page numbers to a PDF with custom position and style. It’s useful for reports, books, assignments, legal documents, and manuals that require clear pagination.\n\nUpload your PDF, choose numbering preferences, apply the changes, and download the final document instantly.",

faqs: [
  {
    q: "Can I choose where page numbers appear?",
    a: "Yes. You can select position, format, and style."
  },
  {
    q: "Does it overwrite existing numbers?",
    a: "New numbers are added; existing content remains unchanged."
  }
],

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
  longDescription: "The PDF to Images tool converts each page of a PDF into high-quality image files such as JPG or PNG. It’s useful for sharing pages individually, creating previews, or reusing content in designs and presentations.\n\nUpload your PDF, choose an output format, and download the generated images instantly. Each page is converted separately with clear resolution.",

faqs: [
  {
    q: "Can I convert specific pages only?",
    a: "Most tools convert all pages. Page selection depends on implementation."
  },
  {
    q: "Are images high resolution?",
    a: "Yes. Output images preserve clarity suitable for viewing and sharing."
  }
],

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
  longDescription: "The PDF to Images tool converts each page of a PDF into high-quality image files such as JPG or PNG. It’s useful for sharing pages individually, creating previews, or reusing content in designs and presentations.\n\nUpload your PDF, choose an output format, and download the generated images instantly. Each page is converted separately with clear resolution.",

faqs: [
  {
    q: "Can I convert specific pages only?",
    a: "Most tools convert all pages. Page selection depends on implementation."
  },
  {
    q: "Are images high resolution?",
    a: "Yes. Output images preserve clarity suitable for viewing and sharing."
  }
],

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
  longDescription: "The PDF Watermark Tool allows you to add text or image watermarks to your PDF files for branding, copyright protection, or document identification. Watermarks are commonly used on reports, contracts, invoices, and confidential documents.\n\nUpload your PDF, enter custom text or upload a watermark image, and apply it instantly. You can clearly mark ownership or status without altering the original content structure.",

faqs: [
  {
    q: "Can I add both text and image watermarks?",
    a: "Yes, you can choose either text-based or image-based watermarks."
  },
  {
    q: "Will the watermark affect readability?",
    a: "No, watermarks are applied transparently to preserve document readability."
  }
],

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
  longDescription: "The Word and PDF Converter allows you to convert Word documents (DOC or DOCX) into PDF format and convert PDFs back into editable Word files. This is useful for sharing documents while preserving layout or making locked PDFs editable again.\n\nUpload your file, convert it instantly, and download the result. The tool maintains formatting accuracy for most standard documents, making it suitable for work, academic, and personal use.",

faqs: [
  {
    q: "Can I convert PDF back to Word?",
    a: "Yes, the tool supports both Word to PDF and PDF to Word conversions."
  },
  {
    q: "Will formatting stay intact?",
    a: "Most layouts are preserved, though complex designs may need minor adjustments."
  }
],

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
  longDescription: "The Open Graph Tag Generator helps you create Open Graph meta tags that control how your website links appear when shared on social platforms such as Facebook, WhatsApp, LinkedIn, and Twitter/X.\n\nEnter page details like title, description, and image URL, then generate ready-to-use meta tags. This improves click-through rates and ensures consistent previews across social networks.",

faqs: [
  {
    q: "Where do I place Open Graph tags?",
    a: "They should be placed inside the HTML <head> section of your page."
  },
  {
    q: "Do OG tags affect SEO?",
    a: "They mainly improve social sharing appearance but can indirectly improve traffic."
  }
],

  howtoSteps: ["Enter page title/description/image URL.", "Generate tags.", "Copy into your HTML head."]
},

{
  title: "URL Encoder / Decoder",
  slug: "url-encoder-decoder",
  category: "SEO Tools",
  description: "Encode or decode URLs instantly for SEO, tracking parameters, and development use.",
  seoTitleTemplate: "URL Encoder Decoder — Encode & Decode URLs Online",
  seoDescriptionTemplate: "Encode or decode URLs instantly. Perfect for SEO, UTM parameters, redirects and web development.",
  longDescription: "The URL Encoder / Decoder tool converts URLs and text into encoded formats that are safe for transmission over the web, and decodes them back into readable form. This is commonly used for SEO tracking parameters, redirects, APIs, and development tasks.\n\nPaste your URL or string, encode or decode it instantly, and copy the result. The tool ensures special characters are handled correctly without breaking URLs.",

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
  longDescription: "The Semantic Keyword Generator helps you discover related keywords and phrases that strengthen topical relevance. Instead of relying on a single keyword, semantic terms help search engines better understand your content.\n\nEnter a main keyword and generate semantically related terms that can be used naturally in headings, paragraphs, and subtopics. This improves SEO depth and reduces over-optimization risks.",

  faqs: [
    {
      q: "What are semantic keywords?",
      a: "Semantic keywords are closely related terms that help search engines understand topic context."
    },
    {
      q: "Why are semantic keywords important for SEO?",
      a: "They improve topical relevance, reduce keyword stuffing, and help pages rank for multiple queries."
    },
    {
    q: "Are semantic keywords the same as synonyms?",
    a: "Not exactly. They include related concepts, entities, and contextual terms."
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
  longDescription: "The XML Sitemap Generator creates a structured sitemap file that helps search engines discover and crawl your website pages efficiently. Sitemaps are essential for large sites, new websites, and frequently updated content.\n\nEnter your website URL, add page paths if needed, and generate a sitemap.xml file ready for submission to Google Search Console and other search engines.",

  faqs: [
    {
      q: "What is an XML sitemap?",
      a: "An XML sitemap lists website URLs to help search engines discover and index pages."
    },
    {
      q: "Do I need a sitemap?",
      a: "Yes, especially for large websites or frequently updated content."
    },
    {
    q: "Where do I submit my sitemap?",
    a: "You can submit it in Google Search Console under the Sitemaps section."
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
  longDescription: "The Robots.txt Generator helps you create a valid robots.txt file that controls how search engine crawlers access your website. It allows or blocks specific pages, directories, or bots from crawling.\n\nChoose your crawl rules, add sitemap references, and generate a ready-to-use robots.txt file. Proper configuration helps manage crawl budget and prevent unwanted indexing.",

  faqs: [
    {
      q: "What is robots.txt?",
      a: "robots.txt tells search engines which pages they are allowed to crawl."
    },
    {
      q: "Can robots.txt block indexing?",
      a: "It controls crawling, not indexing directly."
    },
    {
    q: "Does robots.txt remove pages from Google?",
    a: "No. It controls crawling, not indexing."
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
 longDescription: "The Meta Tag Generator creates SEO-optimized meta titles, descriptions, and social meta tags for your web pages. Well-written meta tags improve click-through rates and help search engines understand page content.\n\nEnter your page details and generate ready-to-use meta tags instantly. This tool is useful for bloggers, marketers, and developers managing multiple pages.",

  faqs: [
    {
      q: "Why are meta tags important?",
      a: "They influence rankings and click-through rates from search results."
    },
    {
    q: "Should every page have unique meta tags?",
    a: "Yes. Unique meta titles and descriptions improve SEO performance."
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
  longDescription: "The Keyword Density Checker analyzes how often a keyword appears in your content and calculates its percentage relative to total word count. This helps prevent keyword stuffing while maintaining SEO relevance.\n\nPaste your content, enter a target keyword, and review density metrics instantly. The tool supports balanced optimization for modern search engines.",

  faqs: [
    {
      q: "What is ideal keyword density?",
      a: "Generally between 1–2%, depending on content length and intent."
    },
    {
    q: "Is keyword density still important?",
    a: "It matters for balance, but content quality and intent are more important."
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
longDescription: "The .htaccess Redirect Generator creates SEO-safe 301 redirect rules used when URLs change. Redirects help preserve search rankings, traffic, and backlinks when moving or restructuring pages.\n\nEnter the old and new URLs to generate ready-to-paste redirect rules for Apache servers.",

  faqs: [
    {
      q: "Why use 301 redirects?",
      a: "They preserve SEO value when URLs change."
    },
    {
    q: "When should I use a 301 redirect?",
    a: "Use it when a page is permanently moved to a new URL."
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
  longDescription: "The Google SERP Preview tool shows how your page title, URL, and meta description will appear in Google search results. It helps you optimize length, wording, and clarity before publishing.\n\nEnter your page details and preview a realistic search snippet instantly. This helps improve click-through rates and avoid truncation.",

  faqs: [
    {
      q: "Does SERP preview match Google exactly?",
      a: "It closely simulates Google’s desktop results appearance."
    },
    {
    q: "Does Google always display my exact meta description?",
    a: "Not always. Google may rewrite snippets based on search intent."
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
  longDescription: "The Canonical URL Generator creates a canonical link tag that tells search engines which version of a page should be treated as the primary one. This helps prevent duplicate content issues caused by URL parameters, tracking codes, category filters, or multiple URLs showing the same content.\n\nEnter the full preferred URL and generate a ready-to-paste <link rel=\"canonical\"> tag for your HTML <head>. Using canonical tags correctly helps consolidate ranking signals, avoid indexing confusion, and keep SEO performance clean across similar or duplicated pages.",

  faqs: [
    {
      q: "What is a canonical URL?",
      a: "It tells search engines which version of a page is primary."
    },
    {
  q: "When should I use a canonical tag?",
  a: "Use it when the same content can be accessed through multiple URLs (for example with UTM parameters, filters, or duplicated pages)."
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
  longDescription: "The Area Converter helps you convert between common area units such as square meters, square feet, acres, hectares, and more. It’s useful for real estate, construction, land measurement, academic work, and everyday conversions where accuracy matters.\n\nEnter a value, choose the input unit and the output unit, and get the converted result instantly. This tool is designed to be fast, clear, and reliable across both metric and imperial systems.",

  faqs: [
  {
    q: "Which area units are supported?",
    a: "Common units include square meters, square feet, acres, hectares, and other standard area measurements."
  },
  {
    q: "Is the conversion accurate?",
    a: "Yes. Conversions are based on standard unit conversion factors."
  }
],

  howtoSteps: ["Enter a value.", "Select input and output units.", "Copy the converted result."]
},
{
  title: "Length Converter",
  slug: "length-converter",
  category: "Converter Tools",
  description: "Convert length units instantly (mm, cm, m, km, inches, feet and more).",
  seoTitleTemplate: "{title} — Convert Length Units Online",
  seoDescriptionTemplate: "Use {title} to convert mm, cm, meters, kilometers, inches, feet and more. Fast and accurate.",
  longDescription: "The Length Converter allows you to convert between metric and imperial length units such as millimeters, centimeters, meters, kilometers, inches, feet, and more. It’s useful for schoolwork, construction measurements, travel planning, engineering, and online shopping.\n\nEnter a value, select your input unit and output unit, and the tool calculates the exact conversion instantly. It’s designed for quick, error-free conversions without manual math.",

  faqs: [
  {
    q: "Does it support both metric and imperial units?",
    a: "Yes. You can convert between metric units (mm, cm, m, km) and imperial units (inches, feet, etc.)."
  },
  {
    q: "Can I convert very small or very large values?",
    a: "Yes. The converter works for a wide range of values, from small measurements to long distances."
  }
],

  howtoSteps: ["Enter a value.", "Choose units to convert from/to.", "Copy the result."]
},
{
  title: "Speed Converter",
  slug: "speed-converter",
  category: "Converter Tools",
  description: "Convert speed units instantly (km/h, mph, m/s and more).",
  seoTitleTemplate: "{title} — Convert Speed Units Online",
  seoDescriptionTemplate: "Convert speed units like km/h, mph and m/s using {title}. Free, fast and accurate.",
  longDescription: "The Speed Converter helps you convert speed values between units such as km/h, mph, m/s, and more. It’s useful for driving conversions, athletics, engineering calculations, travel, and understanding weather or transport speed data.\n\nEnter your speed, choose the source unit and target unit, and get the converted speed instantly. The tool ensures accurate conversions using standard unit relationships.",

  faqs: [
  {
    q: "Can I convert mph to km/h and vice versa?",
    a: "Yes. The tool supports conversions between mph, km/h, m/s, and other common speed units."
  },
  {
    q: "Is this useful for running pace too?",
    a: "It converts speed units. Pace calculations require a pace-specific tool."
  }
],

  howtoSteps: ["Enter speed.", "Select input/output units.", "View the converted speed."]
},
{
  title: "Temperature Converter",
  slug: "temperature-converter",
  category: "Converter Tools",
  description: "Convert Celsius, Fahrenheit and Kelvin instantly.",
  seoTitleTemplate: "{title} — Convert Celsius, Fahrenheit & Kelvin",
  seoDescriptionTemplate: "Use {title} to convert Celsius to Fahrenheit, Kelvin and vice versa. Accurate and instant.",
  longDescription: "The Temperature Converter instantly converts between Celsius, Fahrenheit, and Kelvin. It’s useful for cooking, travel, science homework, lab work, and international weather comparisons.\n\nEnter a temperature value, choose the source scale and target scale, and get the converted result immediately. The tool uses precise formulas for accurate conversions across all supported scales.",

  faqs: [
  {
    q: "Does it support Celsius, Fahrenheit, and Kelvin?",
    a: "Yes. You can convert between all three temperature scales instantly."
  },
  {
    q: "Are conversions formula-based?",
    a: "Yes. The tool uses standard temperature conversion formulas for accuracy."
  }
],

  howtoSteps: ["Enter a temperature.", "Pick source and target scale.", "Copy the converted value."]
},
{
  title: "Volume Converter",
  slug: "volume-converter",
  category: "Converter Tools",
  description: "Convert volume units instantly (liters, ml, gallons, cups and more).",
  seoTitleTemplate: "{title} — Convert Volume Units Online",
  seoDescriptionTemplate: "Convert liters, milliliters, gallons, cups and more with {title}. Fast and free.",
  longDescription: "The Volume Converter lets you convert between volume units such as liters, milliliters, gallons, cups, and more. It’s useful for cooking, baking, chemistry, product measurements, and international unit conversions.\n\nEnter a value, choose your input and output units, and the tool converts it instantly. It’s designed to make volume conversions quick and clear without manual calculations.",

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
  longDescription: "The Weight Converter allows you to convert between common weight units such as kilograms, grams, pounds, ounces, and more. It is useful for cooking, fitness tracking, shipping calculations, and international measurements.\n\nEnter a value, choose the input and output units, and get instant results with high accuracy. The tool eliminates manual calculations and conversion errors.",

faqs: [
  {
    q: "Which weight units are supported?",
    a: "Common units such as kilograms, grams, pounds, and ounces are supported."
  },
  {
    q: "Is the conversion accurate?",
    a: "Yes, standard and widely accepted conversion factors are used."
  }
],

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
 longDescription: "The Average Calculator computes the mean value of a list of numbers instantly. It is commonly used in statistics, academics, finance, and everyday calculations where understanding central values is important.\n\nEnter numbers separated by commas or spaces and calculate the average with one click. The tool handles both small and large datasets efficiently.",

faqs: [
  {
    q: "What type of average does this calculator use?",
    a: "It calculates the arithmetic mean."
  },
  {
    q: "Can I enter decimal numbers?",
    a: "Yes, both integers and decimals are supported."
  }
],

  howtoSteps: ["Enter numbers (comma or space separated).", "Click calculate.", "Copy the result."]
},
{
  title: "Fraction Calculator",
  slug: "fraction-calculator",
  category: "Math Tools",
  description: "Add, subtract, multiply and divide fractions with steps.",
  seoTitleTemplate: "{title} — Fraction Math Online",
  seoDescriptionTemplate: "Use {title} to add, subtract, multiply or divide fractions instantly. Includes simplified results.",
  longDescription: "The Fraction Calculator helps you add, subtract, multiply, and divide fractions with simplified results. It is useful for students, teachers, and anyone working with fractional values.\n\nEnter the fractions, choose an operation, and view the simplified answer instantly. The tool removes the complexity of manual fraction math.",

faqs: [
  {
    q: "Does the calculator simplify results?",
    a: "Yes, results are automatically simplified."
  },
  {
    q: "Can it handle improper fractions?",
    a: "Yes, both proper and improper fractions are supported."
  }
],

  howtoSteps: ["Enter fractions.", "Choose operation.", "Get simplified answer."]
},
{
  title: "Number Base Converter",
  slug: "number-base-converter",
  category: "Math Tools",
  description: "Convert between binary, decimal, hexadecimal and more.",
  seoTitleTemplate: "{title} — Convert Binary, Decimal, Hex",
  seoDescriptionTemplate: "Convert numbers between binary, decimal, hex and other bases using {title}. Fast and accurate.",
 longDescription: "The Number Base Converter converts values between binary, decimal, hexadecimal, and other numeral systems. It is commonly used in computer science, programming, networking, and digital electronics.\n\nEnter a number, select the input and output bases, and convert instantly. The tool ensures accurate base conversions without manual calculation.",

faqs: [
  {
    q: "Which number bases are supported?",
    a: "Binary, decimal, hexadecimal, and other common bases."
  },
  {
    q: "Is this tool useful for programming?",
    a: "Yes, developers often use it for debugging and data representation."
  }
],

  howtoSteps: ["Enter number.", "Select base in/out.", "Copy converted result."]
},
{
  title: "Percentage Calculator",
  slug: "percentage-calculator",
  category: "Math Tools",
  description: "Calculate percentages quickly for any value.",
  seoTitleTemplate: "{title} — Fast Percentage Calculator",
  seoDescriptionTemplate: "Use {title} to calculate percent increase, decrease, and percentage of any number instantly.",
  longDescription: "The Percentage Calculator helps you calculate percentages quickly for various use cases such as discounts, growth rates, comparisons, and financial analysis.\n\nEnter the values, select the percentage mode, and view results instantly. This tool removes guesswork and speeds up percentage calculations.",

faqs: [
  {
    q: "Can I calculate percentage increase or decrease?",
    a: "Yes, the calculator supports multiple percentage calculation modes."
  }
],

  howtoSteps: ["Enter values.", "Choose percentage mode.", "View result."]
},
{
  title: "Ratio Calculator",
  slug: "ratio-calculator",
  category: "Math Tools",
  description: "Simplify and compare ratios instantly.",
  seoTitleTemplate: "{title} — Simplify Ratios Online",
  seoDescriptionTemplate: "Use {title} to simplify ratios and calculate proportional values. Fast and free.",
 longDescription: "The Ratio Calculator simplifies and compares ratios instantly. It is useful in mathematics, cooking, design scaling, finance, and proportional analysis.\n\nEnter ratio values and simplify them with one click. The tool ensures accurate proportional results without manual reduction.",

faqs: [
  {
    q: "Does it simplify ratios automatically?",
    a: "Yes, ratios are reduced to their simplest form."
  }
],

  howtoSteps: ["Enter ratio numbers.", "Click simplify.", "Copy result."]
},
{
  title: "Roman Numeral Converter",
  slug: "roman-numeral-converter",
  category: "Math Tools",
  description: "Convert Roman numerals to numbers and numbers to Roman numerals.",
  seoTitleTemplate: "{title} — Roman Numeral Converter",
  seoDescriptionTemplate: "Convert Roman numerals to integers and integers to Roman numerals with {title}.",
  longDescription: "The Roman Numeral Converter allows you to convert Roman numerals into standard numbers and convert numbers back into Roman numerals. It is useful for education, history references, and document formatting.\n\nEnter a value, choose the conversion direction, and get results instantly using correct Roman numeral rules.",

faqs: [
  {
    q: "What is the largest number supported?",
    a: "Standard Roman numeral limits apply, typically up to 3999."
  }
],

  howtoSteps: ["Enter a value.", "Choose conversion direction.", "View converted output."]
},
{
  title: "Scientific Calculator",
  slug: "scientific-calculator",
  category: "Math Tools",
  description: "Advanced scientific calculator for everyday calculations.",
  seoTitleTemplate: "{title} — Online Scientific Calculator",
  seoDescriptionTemplate: "Use {title} for advanced calculations including scientific functions. Fast and mobile-friendly.",
  longDescription: "The Scientific Calculator provides advanced mathematical functions for complex calculations. It supports trigonometric, logarithmic, exponential, and scientific operations commonly used in education and engineering.\n\nEnter expressions directly or use built-in functions to calculate results instantly. The calculator is optimized for both desktop and mobile use.",

faqs: [
  {
    q: "Is this suitable for students?",
    a: "Yes, it supports most functions required for school and university-level math."
  }
],

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
  longDescription: "The BMI Calculator helps you determine your Body Mass Index based on height and weight. BMI is commonly used as a screening measure to assess weight categories.\n\nEnter your height and weight to calculate BMI instantly and view your corresponding category.",

faqs: [
  {
    q: "Is BMI a medical diagnosis?",
    a: "No, it is a general indicator and not a medical diagnosis."
  }
],

  howtoSteps: ["Enter height and weight.", "Click calculate.", "View BMI result and category."]
},
{
  title: "BMR Calculator",
  slug: "bmr-calculator",
  category: "Health and Fitness Tools",
  description: "Calculate Basal Metabolic Rate (BMR) to estimate daily calorie needs.",
  seoTitleTemplate: "{title} — Calculate BMR Online",
  seoDescriptionTemplate: "Use {title} to estimate BMR and daily calorie requirements. Fast, free and accurate.",
  longDescription: "The BMR Calculator estimates your Basal Metabolic Rate, which represents the number of calories your body needs at rest. It is useful for weight management and nutrition planning.\n\nEnter basic body information and calculate your BMR instantly using established formulas.",

faqs: [
  {
    q: "What is BMR used for?",
    a: "It helps estimate daily calorie needs."
  }
],

  howtoSteps: ["Enter age, height, weight and gender.", "Click calculate.", "View your BMR."]
},
{
  title: "Pregnancy Due Date Calculator",
  slug: "pregnancy-due-date-calculator",
  category: "Health and Fitness Tools",
  popular: true,
  description: "Calculate your baby’s estimated due date, pregnancy week, trimester, and conception date.",
  seoTitleTemplate: "Pregnancy Due Date Calculator — Estimate Baby Due Date",
  seoDescriptionTemplate: "Use this Pregnancy Due Date Calculator to estimate your baby’s due date, current pregnancy week, trimester, and conception date based on LMP.",
  longDescription: "The Pregnancy Due Date Calculator helps expectant parents estimate their baby’s due date using the medically accepted 40-week (280-day) method based on the first day of the last menstrual period (LMP). It also shows the current pregnancy week, trimester, and estimated conception date.\n\nThis tool is useful for pregnancy planning, tracking progress, and understanding key milestones. While the result is an estimate, it provides a reliable reference used by healthcare professionals worldwide.\n\nIf you want to calculate a custom milestone beyond the estimated delivery date, you can use our <a href=\"/tools/future-date\" title=\"Future Date Calculator\">Future Date Calculator</a> to add weeks or months to any selected date. You may also measure precise time gaps using the <a href=\"/tools/time-duration\" title=\"Time Duration Calculator\">Time Duration Calculator</a>.",

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
  longDescription: "The Body Fat Percentage Calculator estimates how much of your body weight is fat using standard measurement formulas. It is useful for fitness tracking and body composition analysis.\n\nEnter the required measurements and receive an estimated body fat percentage instantly.",

faqs: [
  {
    q: "Is this more accurate than BMI?",
    a: "It provides a different perspective focused on fat composition."
  }
],

  howtoSteps: ["Enter measurements.", "Click calculate.", "View body fat estimate."]
},
{
  title: "Calorie Calculator",
  slug: "calorie-calculator",
  category: "Health and Fitness Tools",
  description: "Estimate daily calorie needs for maintenance, loss or gain.",
  seoTitleTemplate: "{title} — Daily Calorie Needs",
  seoDescriptionTemplate: "Use {title} to estimate daily calories based on goals and activity level. Free and accurate.",
 longDescription: "The Calorie Calculator estimates daily calorie needs based on body details and activity level. It helps plan calorie intake for maintenance, weight loss, or muscle gain.\n\nEnter your information, choose an activity level, and get an instant calorie estimate.",

faqs: [
  {
    q: "Are calorie estimates exact?",
    a: "They are estimates and may vary based on individual metabolism."
  }
],

  howtoSteps: ["Enter body details.", "Select activity level.", "View daily calorie estimate."]
},
{
  title: "Ideal Weight Calculator",
  slug: "ideal-weight-calculator",
  category: "Health and Fitness Tools",
  description: "Estimate ideal weight range using common medical formulas.",
  seoTitleTemplate: "{title} — Ideal Weight Estimator",
  seoDescriptionTemplate: "Use {title} to estimate an ideal weight range based on height and gender. Fast and free.",
  longDescription: "The Ideal Weight Calculator estimates a healthy weight range using commonly accepted medical formulas. It is useful as a general reference for fitness and wellness goals.\n\nEnter your height and gender to view an estimated ideal weight range instantly.",

faqs: [
  {
    q: "Is ideal weight the same for everyone?",
    a: "No, it varies based on body type, age, and health."
  }
],

  howtoSteps: ["Enter height and gender.", "Click calculate.", "View ideal weight range."]
},
{
  title: "Water Intake Calculator",
  slug: "water-intake-calculator",
  category: "Health and Fitness Tools",
  description: "Calculate recommended daily water intake based on your body and activity.",
  seoTitleTemplate: "{title} — Daily Water Intake Calculator",
  seoDescriptionTemplate: "Use {title} to estimate how much water you should drink daily. Simple and fast.",
  longDescription: "The Water Intake Calculator estimates how much water you should drink daily based on body weight and activity level. Proper hydration supports overall health and physical performance.\n\nEnter your details and get a recommended daily water intake instantly.",

faqs: [
  {
    q: "Does activity level affect water needs?",
    a: "Yes, higher activity increases hydration requirements."
  }
],

  howtoSteps: ["Enter weight and activity.", "Click calculate.", "View recommended intake."]
},
  {
  title: "Ovulation Calculator",
  slug: "ovulation-calculator",
  category: "Health and Fitness Tools",
  description: "Calculate your ovulation day, fertile window, and next expected period based on your cycle length.",
  seoTitleTemplate: "Ovulation Calculator — Fertile Window & Ovulation Day",
  seoDescriptionTemplate: "Use this Ovulation Calculator to estimate ovulation day, fertile window, and next period based on LMP and cycle length. Fast and easy.",
  longDescription:
    "The Ovulation Calculator helps you estimate your ovulation day, fertile window, and next expected period using the first day of your last menstrual period (LMP) and your average cycle length.\n\nIt’s useful for planning, cycle tracking, and understanding your most fertile days. The tool applies a common estimation method where ovulation typically occurs about 14 days before the next period, then calculates a fertile window around that date.\n\nResults are estimates and can vary between individuals, so for medical decisions or irregular cycles, consider confirming with a healthcare professional.",

  faqs: [
    {
      q: "How is the ovulation day calculated?",
      a: "A common estimate is ovulation occurs about 14 days before your next period. The tool calculates ovulation as LMP + (cycle length − 14)."
    },
    {
      q: "What is the fertile window?",
      a: "The fertile window is the range of days when pregnancy is most likely, typically the 5 days before ovulation plus the ovulation day (and sometimes the day after)."
    },
    {
      q: "Is this accurate for irregular cycles?",
      a: "It’s an estimate based on an average cycle length. If your cycle is irregular, the results may be less accurate and you may need additional tracking methods."
    }
  ],

  howtoSteps: [
    "Select the first day of your last menstrual period (LMP).",
    "Enter your average cycle length in days (for example, 28).",
    "Click Calculate Ovulation to view your estimated ovulation day and fertile window.",
    "Use the results for planning and cycle tracking."
  ]
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
  longDescription: "The Hash Generator creates cryptographic hashes such as MD5, SHA-1, and SHA-256 from any text input. Hashes are commonly used for data integrity checks, password storage, and verification purposes.\n\nEnter text, select a hashing algorithm, and generate a hash instantly. The tool is fast, deterministic, and produces the same hash every time for identical input.",

faqs: [
  {
    q: "What is a hash used for?",
    a: "Hashes are used to verify data integrity and securely represent text or passwords."
  },
  {
    q: "Is hashing the same as encryption?",
    a: "No. Hashing is one-way and cannot be reversed, unlike encryption."
  }
],

  howtoSteps: ["Enter text.", "Choose hash type.", "Copy generated hash."]
},
{
  title: "Password Generator",
  slug: "password-generator",
  category: "Security Tools",
  description: "Generate strong passwords with custom length and rules.",
  seoTitleTemplate: "{title} — Strong Password Generator",
  seoDescriptionTemplate: "Create secure passwords instantly using {title}. Customize length and character sets.",
  longDescription: "The Password Generator helps you create strong, random passwords with customizable length and character rules. Strong passwords reduce the risk of brute-force attacks and unauthorized access.\n\nChoose password length, include numbers, symbols, and uppercase letters, then generate a secure password instantly. This tool is ideal for creating passwords for accounts, apps, and systems.",

faqs: [
  {
    q: "What makes a password strong?",
    a: "Length, randomness, and a mix of letters, numbers, and symbols."
  },
  {
    q: "Are generated passwords stored?",
    a: "No. Passwords are generated locally and not saved."
  }
],

  howtoSteps: ["Select length and options.", "Generate password.", "Copy it."]
},
{
  title: "Password Strength Checker",
  slug: "password-strength-checker",
  category: "Security Tools",
  description: "Check password strength and get improvement tips instantly.",
  seoTitleTemplate: "{title} — Check Password Strength",
  seoDescriptionTemplate: "Use {title} to test password strength and improve security. Fast and private.",
 longDescription: "The Password Strength Checker evaluates how secure a password is based on length, complexity, and common attack patterns. It provides instant feedback to help improve weak passwords.\n\nType a password to see a strength score and suggestions for improvement. The tool works locally and does not store or transmit password data.",

faqs: [
  {
    q: "Does the tool save my password?",
    a: "No. Passwords are checked locally and never stored."
  },
  {
    q: "What strength score is recommended?",
    a: "Strong or very strong passwords are recommended for better security."
  }
],

  howtoSteps: ["Type password.", "See strength score.", "Follow improvement tips."]
},

];

// DO NOT REMOVE THIS
export default toolsData; 
