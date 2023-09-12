# Components directory
This directory contains most of your Vue.js Components.  
- Following the [Vue.js Style Guide](https://vuejs.org/v2/style-guide/), each component should be in its own file.  
- All components are named in PascalCase.
- Basic components are named Base*
- Unique components used only once are named The*
- All sub-components are named starting with the component name they belong to followed by the sub-component name.  

### Usage of components in the different pages
To gain a better understanding of the components used in the different pages, here is a list of all the components used in each page, and a brief description of their role.  
To further understand the architecture and usage of components it is recommended to use the Vue.js devtools extension for your browser and explore the `Components` tab while navigating the different pages.  
Finally the `Icon` component is  used to display icons from the [Iconify Vue library](https://docs.iconify.design/icon-components/vue/), which hast a vast list of icon-sets you'll find [here](https://icon-sets.iconify.design/).  
#### `Home Page`
- `HomeCreateGame.vue` standalone section used to create a new game.
  - `BaseToggleSwitch.vue` basic toggle switch component.
- `HomeJoinGame.vue` standalone section used to join an existing game when playing in multiplayer.  


#### `Setup Page`
- `SetupProductionList.vue` list component located on the left hand side of the page, and containing all production curves available to the player.
- `SetupProductionResume.vue` display component located in the middle left of the page, displaying the details of the production curve currently selected.  
- `SetupScenarioList.vue` list component located on the right hand side of the page, and containing all scenarios available to the player.  
- `SetupScenarioResume.vue` display component located in the middle right of the page, displaying the details of the scenario currently selected.
- `SetupValidationSection.vue` bottom section used to validate the choice of production curve and scenario, or randomize it and then start the game.

#### `Game Page`
- `TheGameInfoWindow.vue` window component used to display information and explain the game's rules to the player when they first join the game or click on the info icon located on the navbar.
- `BaseAlert.vue` basic alert component used to display errors and warnings.
- `EquipmentList.vue` list component located on the left hand side of the page, and containing all equipments available to the player.
  - `EquipmentListEquipment.vue` list item component used to display the details of an equipment.
- `Board.vue` the game's main display
  - `BaseCanvas.vue` basic html canvas component used to draw the situation on the game's board.
- `EnergyMenuAddEnergyWindow.vue` window component used to add energy to the player's energy storage.
  - `CardPopup.vue` main popup component
- `EnergyMenuUseEnergyWindow.vue` window component used to use energy from the player's energy storage.
  - `CardPopup.vue` main popup component
- `BoardConsumptionAddWindow.vue` window component used to add a consumption to the game's board.
  - `CardPopup.vue` main popup component
- `BoardConsumptionDetails.vue` display component used to display the details of a consumption on the game's board or modify them.
  - `CardPopup.vue` main popup component
- `BoardIconsBar.vue` container component located at the bottom right page of the game's page, and made up of all menu icons.
  - `MoneyMenuIcon.vue` menu icon component used to display the player's money.
    - `BaseMenuIcon.vue` basic menu icon component.
  - `MultiplayerMenu.vue`  (not implemented yet)
  - `MultiplayerMenuIcon.vue` menu icon to access multiplayer menu.
    - `BaseMenuIcon.vue` basic menu icon component.
  - `MarketMenu`.vue Energy Market allowing players to buy and sell energy.
  - `MarketMenuIcon.vue` menu icon component used to access the market.
    - `BaseMenuIcon.vue` basic menu icon component.
  - `EnergyMenu.vue` Energy Menu allowing players to store and use energy.
  - `EnergyMenuIcon.vue` menu icon component used to access the energy menu.
    - `BaseMenuIcon.vue` basic menu icon component.
  - `SettingsMenu.vue` (not implemented yet)
  - `SettingsMenuIcon.vue` menu icon component used to access the settings menu.
    - `BaseMenuIcon.vue` basic menu icon component.
  - `ResultsMenuIcon.vue` menu icon component used to access the results page.
    - `BaseMenuIcon.vue` basic menu icon component.
- `ResultsMenuConfirmation.vue` popup component used to confirm the player's choice to see their results.

Composition of the `CardPopup` component:

- `CardPopup.vue` main popup component for all windows related to the game's board.
  - `CardPopupAmountModifier.vue` Allow user to modify an amount ( ex: price, energy consumed, etc.)
  - `CardPopupContent.vue` container component used to display the main information related to a consumption, energy store, discharge, etc. (ex: Energy amount, price, time)
  - `CardPopupHeader.vue` container component used to display the header of a popup (ex: Name of the consumption, icon)
  - `CardPopupModificationButtons.vue` modification buttons to chose between modifying or deleting an object.
  - `CardPopupSaveButtons.vue` save or cancel buttons.
  - `CardPopupTimeModifier.vue` Allow user to modify the time of a consumption, energy store, discharge, etc.

#### `Results Page`
- `ResultsSituationDisplay.vue` container component to present a situation be it at the start or end of the game.
  - `ResultsSituationDisplayIndicators.vue` container component to present all the indicators of a situation.
    - `ResultsSituationDisplayIndicatorsIndicator.vue` component to present an indicator in a situation. (ex: `Total consumption`)
    - `ResultsSituationDisplayIndicatorsRate.vue` component to present a rate for a given situation.
