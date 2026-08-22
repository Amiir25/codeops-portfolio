// Read bill and partySize.
let bill = "2350";
const partySize = 5;

// convert the bill with Number().
bill = Number(bill);

// Add a 10% tip when the bill is over 300 ETB, else 5%.
const tip = bill > 300 ? (bill * 0.10) : (bill * 0.05);

// Compute the total and the per-person amount.
const total = bill + tip;
const perPerson = total / partySize

// Print a clear message with a template literal.
console.log(`\
    Total: ${total}
    Party Size: ${partySize}
    Bill per person: ${perPerson}
`);

// Use a switch to add a TeleBirr / CBE Birr service fee.
const paymentMethod = "TeleBirr";
switch (paymentMethod) {
    case "TeleBirr":
        console.log(`Pay ${perPerson} each with Telebirr`);
        break;
    case "CBE":
    case "cbe":
        console.log(`Pay ${perPerson} each with CBE`);
        break;
    default:
        console.log("Enter a valid payment option");
}