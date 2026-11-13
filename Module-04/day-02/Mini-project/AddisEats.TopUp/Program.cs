// Ask the customer for a name, a mobile network (Ethio Telecom or Safaricom), and a top-up amount in ETB.

// Create the arrays
string[] names = new string[5];
string[] networks = new string[5];
string[] phones = new string[5];
decimal[] amounts = new decimal[5];
decimal[] bonuses = new decimal[5];
decimal[] credits = new decimal[5];

// The counter
int i = 0;

// Start the loop
while (i < 5)
{
    Console.Write($"Enter the name of customer {i + 1}: ");
    string? name = Console.ReadLine()?.Trim();
    if (string.IsNullOrWhiteSpace(name)) name = "Customer";
    names[i] = name;

    // --
    Console.Write($"Enter the mobile network (Tele / Safari) of customer {i + 1}: ");
    string? network = Console.ReadLine()?.Trim();
    if (string.IsNullOrWhiteSpace(network)) network = "Tele";
    networks[i] = network;

    // --
    string? phone;
    do
    {
        Console.Write($"Enter the phone number of customer {i + 1}: ");
        phone = Console.ReadLine();

        if (string.IsNullOrWhiteSpace(phone))
        {
            Console.WriteLine("\n!!! Phone can not be empty !!!\n");
        }
    } while (string.IsNullOrWhiteSpace(phone));
    phones[i] = phone;

    // ---
    string? inputAmount;
    decimal amount;
    do
    {
        Console.Write("Enter amount in ETB: ");
        inputAmount = Console.ReadLine();

        // Parse the amount with TryParse. Reject anything that is not a number, is zero or negative, or is above 5,000 ETB
        if (!decimal.TryParse(inputAmount, out amount) || amount == 0 || amount >= 5000)
        {
            Console.WriteLine("\n!!! Invalid amount. Amount should be above 0 and below 5,000. !!!\n");
        }
    } while (!decimal.TryParse(inputAmount, out amount) || amount == 0 || amount >= 5000);
    amounts[i] = amount;

    // Use a switch expression to set a bonus: Ethio Telecom gives 5%, Safaricom gives 3%, anything else gives 0%.
    decimal bonus = network switch
    {
        "Tele" => 0.05m,
        "Safari" => 0.03m,
        _ => 0,
    };
    bonuses[i] = bonus;

    decimal credit = amount + (amount * bonus);
    // Amounts of 1,000 ETB or more get an extra 20 ETB on top of the bonus.
    if (amount >= 1000) credit += 20;
    credits[i] = credit;

    Console.WriteLine("\n********************\n");

    i++;
}

// Print one aligned line per customer and a grand total row.
i = 0;

while (i < 5)
{
    Console.WriteLine($"Customer {i + 1}: {names[i]} | Network: {networks[i]} | Amount: {amounts[i]:N2} ETB | Bonus: {bonuses[i]:P0} | Credit: {credits[i]:N2} ETB");
    i++;
}

decimal grandTotal = 0;
foreach(decimal credit in credits)
{
    grandTotal += credit;
}

Console.WriteLine($"\nGrand Total: {grandTotal:N2} ETB");
