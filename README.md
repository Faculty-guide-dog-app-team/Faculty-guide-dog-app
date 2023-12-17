## Konfiguracja
[link](https://reactnative.dev/docs/environment-setup)

## This project was done for the Group Project class of the CS course at the Warsaw University of Technology

This is a prototype of an application which helps people find their way around a public building such as a government office or, in our case, the Faculty of Electronics and Information Technology at WUT.
It utilises BLE devices placed around the building we wish to navigate which stream their location. Based on the strenght of the signal we are able to determine the location of the user's phone and select the optimal path towards the desired room (or any other pre-defined place on the map).


### Contributors:
- Adam Szokalski - bluetooth communication with esp32 controllers, app deployment
- Michał Łuszczek - navigation (pathfinding) backend, designing a virtual representation of the space to be navigated
- Tomasz Truszkowski - mobile app frontend, communication between the frontend and backend
- Aleksandra Łabęda - mobile app frontend
- Jakub Pęk - converting the bluetooth location and distance data from esp32 controllers to a location on the virtual map

