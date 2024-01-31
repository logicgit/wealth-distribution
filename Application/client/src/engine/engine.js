    // engine.js
    // Functions to do our calculations

    // Amount of money required to remove someone from poverty
    const povertyLine = 10000

    // Store the dateTime when page loaded
    const pageLoadedTimeInMillisecs = Date.now();

    // Interest rate
    const interestRate = 0.05;
    
    // Reduce the value by the %
    export function reduceValue(value, percent) {
        var adjustedValue =  value * ((100-percent)/100.0);
        return Math.floor(adjustedValue * 100) / 100
    };

    // Return the value reduced by the %
    export function reducedValue(value, percent) {
        var adjustedValue =  value * ((percent)/100.0);
        return Math.floor(adjustedValue * 100) / 100
    };

    // We are going to adjust the number of people in poverty by assigning the wealthToShare
    // The wealthToShare divided by the povertyLine is the number of people who can be removed
    // Convert inbound figure from billions to pounds
    // We need to work out what % of the total pot each demopgraphic can have
      export function reducePovertyNumber(totalPovertyCount, povertyCount, wealthToShare, value) {
        var wealthToShareInPounds = wealthToShare * 1000000000 * (value/100.0);

        // Adjust wealth to share for each demographic
        if (totalPovertyCount === povertyCount) {
            // Do nothing as this is the total
        }
        else {
            wealthToShareInPounds = (povertyCount / totalPovertyCount) * wealthToShareInPounds;
        }

        var numberOfPeopleOutOfPoverty = Math.floor(wealthToShareInPounds / povertyLine);
        povertyCount -= numberOfPeopleOutOfPoverty;
        
        // Handle -ve numbers
        return povertyCount < 0 ? 0 : povertyCount;
    };

    // Calculate interest since page loaded
    // Work out how many seconds has elapsed
    // Calculate interest using interestRate constant
    export function calcInterestSincePageLoaded(wealth) {
        var currentTimeInMillisecs = Date.now();

        // Annual interest
        var annualInterest = wealth * interestRate;

        // Interest in one second
        var secondInterest = annualInterest / 365 / 24 / 3600;

        // Return interest since page loaded
        var interest = Math.floor((currentTimeInMillisecs - pageLoadedTimeInMillisecs) / 1000 * secondInterest);

        return interest;
    }

    // Calculate interest start of day
    // Work out how many seconds has elapsed
    // Calculate interest using interestRate constant
    export function calcInterestSinceStartOfDay(wealth) {
        // Parse the input date
        const inputDate = new Date();

        // Set the input date to midnight
        inputDate.setHours(0, 0, 0, 0);
        var startOfDayInMillisecs = inputDate.getTime();
        var currentTimeInMillisecs = Date.now();

        // Annual interest
        var annualInterest = wealth * interestRate;

        // Interest in one second
        var secondInterest = annualInterest / 365 / 24 / 3600;

        // Return interest since page loaded
        var interest = Math.floor((currentTimeInMillisecs - startOfDayInMillisecs) / 1000 * secondInterest);

        return interest;
    }

    // Calculate interest start of day
    // Work out how many seconds has elapsed
    // Calculate interest using interestRate constant
    export function calcInterestSinceStartOfYear(wealth) {
        // Parse the input date
        const inputDate = new Date();

        // Set the input date to midnight
        inputDate.setMonth(0);
        inputDate.setDate(1);
        inputDate.setHours(0, 0, 0, 0);
        var startOfDayInMillisecs = inputDate.getTime();
        var currentTimeInMillisecs = Date.now();

        // Annual interest
        var annualInterest = wealth * interestRate;

        // Interest in one second
        var secondInterest = annualInterest / 365 / 24 / 3600;

        // Return interest since page loaded
        var interest = Math.floor((currentTimeInMillisecs - startOfDayInMillisecs) / 1000 * secondInterest);

        return interest;
    }    
    
    
    // Helper function to work out % change
    export function calculatePercentageChange(originalValue, newValue) {
        var percentChange = (newValue / originalValue) * 100;
        return roundToDecimalPlaces(percentChange, 1);
    }

    // Work out how many items of "cost" that "amount" can afford
    // Round the returned value
    export function howManyCanWeAfford(cost, amount){
        return Math.floor(amount / cost);
    }

    // Helper function to round to x decimal places
    function roundToDecimalPlaces(num, decimalPlaces) {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(num * factor) / factor;
    }

    