'''
1. Temperature label. Ask for a temperature in °C, then print "cold" below 15, "warm" from 15–
28, and "hot" above 28, using if / elif / else.
'''

# temp = int(input("Enter the tempreture: "))

# if (temp < 15):
#     print("Cold")
# elif (temp > 15 and temp < 28):
#     print("Warm")
# else:
#     print("Hot")


# ====================================================================== #

'''
2. Receipt loop. Use a for loop and range to print receipt numbers 1 through 10, each on its own
line as "Receipt #N".
'''

# for i in range(1, 11):
#     print(f"Range #{i}")


# ====================================================================== #

'''
3. Even numbers. Print every even number from 1 to 20 using a loop and the modulo operator %.
'''

# for i in range(1, 21):
#     if i % 2 == 0:
#         print (i)


# ====================================================================== #

'''
4. Discount function. Write apply_discount(price, percent=10) that returns the price after the
discount. Test it with and without the default.
'''

# def apply_discount(price, percent = 10):
#     discount_price = price - (price * (percent / 100))
#     return discount_price

# print(apply_discount(200))
# print(apply_discount(200, 50))


# ====================================================================== #

'''
5. Countdown. Use a while loop to count down from 5 to 1, printing each number, then print
"Liftoff!".
'''

# countdown = 5
# while countdown > 0:
#     print (countdown)
#     countdown -= 1
# print ("Liftoff!")
