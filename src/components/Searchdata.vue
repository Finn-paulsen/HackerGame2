<template id="datenbankFenster" class="versteckt" @click.stop>
    <input type="text" v-model=filterInput placeholder="Namen eingeben" />
    <button @click="sucheNachName">Suchen</button>
    <div class="ergebnis-container">
      <div
        v-for="(datensatz, index) in ergebnisse"
        :key="index"
        class="datensatz"
      >
        <strong class="datentyp">Name:</strong>&nbsp;{{ datensatz.name }}<br />
        <hr />
        <strong class="datentyp">Adresse:</strong><br />
        {{ datensatz.adresse }}<br />
        <hr />
        <strong class="datentyp">IBAN:</strong><br />
        {{ datensatz.iban }}<br />
        <hr />
        <strong class="datentyp">E-Mail Adresse:</strong><br />
        {{ datensatz.email }}
      </div>
    </div>
  </template>

  <script>
import { ref } from "vue"

const filterInput =ref() 

function sucheNachName(parameter){
    if (parameter==filterInput){
         filterInput.value=true
    }else {
        
    }
}





// const sucheNachName = () => {
//   ergebnisse.value = datensaetze.value.filter((datensatz) =>
//     datensatz.name.toLowerCase().includes(filterInput.toLowerCase())
//   );
// };



</script>