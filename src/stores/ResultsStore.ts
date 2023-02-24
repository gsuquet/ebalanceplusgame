import { emptyResultsConfirmationWindowParameters } from "../assets/entityEmptyResults";
import { ResultsConfirmationWindowParameters } from "../types/Results";

export const useResultsStore = defineStore({
    id: "ResultsStore",
    state: () => {
        return {
            resultsConfirmationWindowParameters: emptyResultsConfirmationWindowParameters as ResultsConfirmationWindowParameters,

        };
    },
    actions: {
        openResultsConfirmationWindow() {
            this.resultsConfirmationWindowParameters.isConfirmationWindowOpen = true;
        },
        closeResultsConfirmationWindow() {
            this.resultsConfirmationWindowParameters.isConfirmationWindowOpen = false;
        }
    },
    getters: {
        getIsConfirmationWindowOpen: (state) => {
            return state.resultsConfirmationWindowParameters.isConfirmationWindowOpen;
        },
        getConfirmationButtonIcon: (state) => {
            return state.resultsConfirmationWindowParameters.confirmationButtonIcon;
        }
    }
});
