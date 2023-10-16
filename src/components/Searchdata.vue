<template>
  <div id="datenbankFenster" class="versteckt" @click.stop>
    <input v-model="filterInput" @keyup.enter="sucheNachName" placeholder="Namen eingeben" />

    <button @click="sucheNachName">Suchen</button>
    <div class="ergebnis-container">
      <table class="custom-table">
        <tbody>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index" class="datensatz" @mouseover="highlightRow(index)"
            @mouseout="unhighlightRow(index)">
            <td class="datentyp">Name:</td>
            <td>{{ datensatz.first_name }} {{ datensatz.last_name }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">Adresse:</td>
            <td>
              {{ datensatz.street_adress }} {{ datensatz.street_numebr }}<br />
              {{ datensatz.postal_code }} {{ datensatz.street_name }}
            </td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">IBAN:</td>
            <td>{{ datensatz.iban }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">E-Mail Adresse:</td>
            <td>{{ datensatz.email }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">IP Adresse:</td>
            <td>{{ datensatz.ip_address }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">ISBN:</td>
            <td>{{ datensatz.isbn }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">Credit Card:</td>
            <td>{{ datensatz.credit_card }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">Money:</td>
            <td>{{ datensatz.money }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">Bitcoin Adresse:</td>
            <td>{{ datensatz.bitcoin_address }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">Street Adress:</td>
            <td>{{ datensatz.street_address }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">Street Name:</td>
            <td>{{ datensatz.street_name }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">Street Number:</td>
            <td>{{ datensatz.street_number }}</td>
          </tr>
          <hr>
          <tr v-for="(datensatz, index) in ergebnisse" :key="index">
            <td class="datentyp">Postal Code:</td>
            <td>{{ datensatz.postal_code }}</td>
          </tr>
          <tr v-if="ergebnisse.length === 0">
            <td colspan="2">Keine Ergebnisse gefunden.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    datensaetze: Array,
    toggleDatenbankFenster: Function,
  },
  data() {
    return {
      filterInput: "",
      ergebnisse: [],
      highlightedRow: null,
    };
  },
  methods: {
    sucheNachName() {
      this.ergebnisse = this.datensaetze.filter((datensatz) =>
        datensatz.first_name.toLowerCase().includes(this.filterInput.toLowerCase())
      );
    },
    highlightRow(index) {
      this.highlightedRow = index;
    },
    unhighlightRow() {
      this.highlightedRow = null;
    },
  },
};
</script>

<style scoped>
#datenbankFenster {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 3;
  color: #fff;
}

#datenbankFenster input,
#datenbankFenster button {
  background-color: #ff6600;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}

#datenbankFenster button:hover {
  background-color: #e65c00;
}

.datensatz {
  background-color: #2b2b2b;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #fff;
  transition: transform 0.2s ease-in-out;
}

.datensatz:hover {
  transform: scale(1.05);
}

.datentyp {
  color: #ff6600;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.datenwert {
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 10px;
}

hr {
  border: 0;
  border-top: 1px solid #444;
  margin: 10px 0;
}
</style>
