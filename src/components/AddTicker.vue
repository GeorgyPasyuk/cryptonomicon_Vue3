<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            v-model="ticker"
            v-on:keydown.enter="add"
            @input="autocomplete"
            type="text"
            name="wallet"
            id="wallet"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div
          class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
          v-if="ticker"
        >
          <span
            v-for="ticker in filteredCoinList.slice(0, 4)"
            v-bind:key="ticker"
            @click="autoAdd(ticker)"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ ticker }}
          </span>
        </div>
        <template v-for="t in tickers" :key="t">
          <div
            class="text-sm text-red-600"
            v-if="t.name === ticker.toLowerCase()"
          >
            Такой тикер уже добавлен
          </div>
        </template>
      </div>
    </div>
    <add-button @click="add" type="button" :disabled="disabled" class="my-4" />
  </section>
</template>
<script>
import AddButton from "./AddButton.vue";
export default {
  components: {
    AddButton,
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      ticker: "",
      coinList: [],
      filteredCoinList: [],
    };
  },
  mounted() {
    fetch("https://min-api.cryptocompare.com/data/all/coinlist?summary=true")
      .then((response) => response.json())
      .then((json) => {
        for (let i in json.Data) {
          this.coinList.push(json.Data[i]["Symbol"]);
        }
      });
  },
  methods: {
    add() {
      this.$emit("add-ticker", this.ticker);
      this.ticker = "";
    },
    autoAdd(ticker) {
      this.ticker = ticker;
      this.add();
    },
    autocomplete() {
      this.filteredCoinList = this.coinList.filter((abc) => {
        return abc.toLowerCase().startsWith(this.ticker.toLowerCase());
      });
    },
  },
};
</script>
