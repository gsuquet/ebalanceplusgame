# Data directory
This directory contains the data used in the project.

## Directory structure
```
src
└── data
    ├── batteries.json
    ├── consumptions.json
    ├── days.json
    ├── energyMarketParameters.json
    ├── energyStorageParameters.json
    ├── equipments.json
    ├── equipmentTypes.json
    ├── equipmentTypesDurationParameters.json
    ├── moneyParameters.json
    ├── productionCurves.json
    ├── scenarios.json
    └── seasons.json
```

## Data files
### `batteries.json`
Contains the batteries equipment types used for charging and using energy.

### `consumptions.json`
Used to store the initial situations consumptions

### `days.json`
Contains the days of the week.

### `energyMarketParameters.json`
Contains the parameters used for the energy market.

### `energyStorageParameters.json`
Contains the parameters used for the energy storage.

### `equipments.json`
List of all available equipments, to be used by the different scenarios.

### `equipmentTypes.json`
List of all available equipment types, to be used by the different equipments and scenarios.

### `equipmentTypesDurationParameters.json`
Different parameters used for the duration of the equipment types. Currently unused as the parameters are set directly in `equipmentTypes.json`.  
To be used in a future version.

### `moneyParameters.json`
Contains the parameters of the user's available money.

### `productionCurves.json`
Contains the production curves. 

### `scenarios.json`
All the different scenarios to be played by the users. In the scenarios objects are the different settings, equipments, equipmentTypes and initialConsumptions to be used.

### `seasons.json`
Contains the seasons of the year.
