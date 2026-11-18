// === 2 ===

Console.WriteLine("\n=== 2 ===\n.");

/*
Scaffold a console project called AddisEats.Exercises. Print three lines: your name, today's date
formatted as dd MMM yyyy, and the text "CodeOps Module 4 — .NET track".
*/

Console.WriteLine("Amir Sadik");
Console.WriteLine($"{new DateTime(2026, 11, 18):dd MMM yyyy}");
Console.WriteLine("CodeOps Module 4 — .NET track");


// === 3 ===

Console.WriteLine("\n=== 3 ===\n.");
/*
Declare one variable of each primitive type in the Part 2 table, give each a realistic Addis Eats
value, and print each one with its type name using a $ interpolated string.
*/

int itemQty = 12;
long annualOrder = 1_200_000;
decimal price = 420m;
double packageWeight = 5.0923;
bool isDelivered = true;
char tableCode = 'C';
string branchManager = "John Doe";
DateTime orderedAt = DateTime.UtcNow;

Console.WriteLine($"""
Int: {itemQty}
Long: {annualOrder}
Decimal: {price}
Double: {packageWeight}
Bool: {isDelivered}
Char: {tableCode}
String {branchManager}
DateTime: {orderedAt}
""");


// === 4 ===

Console.WriteLine("\n=== 4 ===\n.");
/*
Write a program that declares a subtotal of 1480.5m and a delivery fee of 60m, then prints a
three-line receipt where the amounts are right-aligned in a column of width 10 and formatted
with N2.
*/

decimal subtotal = 1480.5m;
decimal deliveryFee = 60m;
Console.WriteLine($"""
Subtotal: {subtotal,10:N2}
DeliveryFee: {deliveryFee,10:N2}
Total: {subtotal + deliveryFee,10:N2}
""");


// === 5 ===

Console.WriteLine("\n=== 5 ===\n.");
/*
Demonstrate that integer division truncates. Print 7 / 2 as an int, then print the same division
cast to decimal, and add a one-line comment explaining which one you would use for a delivery
fee split three ways.
*/

int intValue = 7 / 2;
Console.WriteLine(intValue);

decimal decimalValue = (decimal)7 / 2;
Console.WriteLine(decimalValue);


// === 6 ===

Console.WriteLine("\n=== 6 ===\n.");
/*
Write a program with two int variables where one is assigned from the other, and two
List<string> variables where one is assigned from the other. Change each copy and print all four
results. Add a comment above each pair explaining why the output differs.
*/

int age1 = 44;
// The output of the 2 variables is different because the variables are value types. Assigning copies creates a new value.
int age2 = age1;
age2 = 55;

Console.WriteLine($"Age-1: {age1}");
Console.WriteLine($"Age-2: {age2}");

List<string> foodList1 = ["Doro", "Shiro", "Misir"];

// The output of the 2 variables is the same because the variables are reference types. Assigning copies give the reference to the value.
List<string> foodList2 = foodList1;
foodList2[2] = "Tibs";

Console.WriteLine("Food List 1");
foreach(string food in foodList1)
{
    Console.Write($"{food} ");
}
Console.WriteLine("\n");

Console.WriteLine("Food List 2");
foreach(string food in foodList2)
{
    Console.Write($"{food} ");
}
Console.WriteLine("\n");


// === 7 ===

Console.WriteLine("\n=== 7 ===\n.");
/*
Take a string? that may be null and print its length three different ways — with an explicit null
check, with ??, and with ?. — so that none of the three ever crashes.
*/

string? address = "Addis Ababa";

// 
if (address == null)
{
    Console.WriteLine("Address not found");
}
else
{
    Console.WriteLine(address.Length);;
}

// 
Console.WriteLine(address ?? "Address not found");

// 
Console.WriteLine(address?.Length);


// === 8 ===

Console.WriteLine("\n=== 8 ===\n.");
/*
Write a console program that asks for an ETB amount, parses it with TryParse, rejects anything
that is not a number or is zero or negative, and otherwise prints it formatted with N2. Test it with
the input "four hundred" and confirm it does not crash.
*/

Console.Write("Enter amount in ETB: ");
string input = Console.ReadLine() ?? "";

if (!decimal.TryParse(input, out decimal amount) || amount <= 0)
{
    Console.WriteLine("Enter a valid amount");
    return;
}

Console.WriteLine($"Amount: {amount:N2}");