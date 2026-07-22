'''
1. Vehicle hierarchy.
Make a Vehicle base class with make, model, and a describe() method.
Add Car and Truck subclasses.

2. Use super().
Give Truck a capacity attribute, setting make and model via super().__init__().

3. Override.
Override describe() in Truck so it also mentions the capacity.

4. Polymorphism.
Put several vehicles in a list and loop over them, calling describe() on each.

5. Abstract method.
Make Vehicle an abstract base class with an abstract wheels() method, and
have each subclass return its own number.
'''

from abc import ABC, abstractmethod

class Vehicle(ABC):
    """A class to model vehicle"""

    def __init__(self, make, model):
        """Initialize vehicle attributes"""
        self.make = make
        self.model = model
    
    def describe(self):
        """Describe the vehicle"""
        print(f"{self.model} - {self.make}")

    @abstractmethod
    def wheels(self):
        """Define the number wheels the vehicle has"""
        ...

class Car(Vehicle):
    """A vehicle subclass to model car"""

    def __init__(self, make, model):
        super().__init__(make, model)

    def wheels(self):
        return 4

class Truck(Vehicle):
    """A vehicle subclass to model truck"""

    def __init__(self, make, model, capacity):
        """Initialize truck attributes"""
        super().__init__(make, model)
        self.capacity = capacity
    
    def describe(self):
        """Describe the truck"""
        print(f"{self.model} - {self.make} - {self.capacity}")
    
    def wheels(self):
        return 10

cars = {
    "toyota": "corolla",
    "honda": "civic",
    "tesla": "model3"
}

car_list = []

for make, model in cars.items():
    car_list.append(Car(make.title(), model.title()))

trucks = {
    "ford": "F-150",
    "chevrolet": "silverado",
    "RAM": "1500"
}

truck_list = []

for make, model in trucks.items():
    truck_list.append(Truck(make, model, "200kg"))

vehicle_list = car_list + truck_list
for v in vehicle_list:
    v.describe()
