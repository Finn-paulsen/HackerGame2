import { defineStore } from 'pinia'
import { ref } from "vue"
import MOCK_DATA from "../assets/MOCK_DATA.json"

export const userStore = defineStore("userStore", () => {
    const ID = 5520
    const user = ref(false)
    const showErrorMessage = ref(false);
    const storeHelper = ref({ Searchresult: false });
    const mockData = JSON.stringify(MOCK_DATA)
    const isDarkTerminalModalActive = ref(false)
    
    function toggleDarkTerminal(){
        isDarkTerminalModalActive.value =!isDarkTerminalModalActive.value
    }

    function checkAccess(parameter) {
        if (parameter == ID) {
            user.value = true
        } else {
            showErrorMessage.value = true
        }
    }

    function Searchdata(parameter) {
        if (parameter == storeHelper) {
            storeHelper.value.true
        } else {

        }
    }
    console.log(MOCK_DATA)

    return {
        ID, user, checkAccess, showErrorMessage,
        Searchdata,toggleDarkTerminal,isDarkTerminalModalActive
    }
}) 