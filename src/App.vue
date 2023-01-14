<template>
  <div class="contatiner">
    <div class="box">
      <router-link
        class="box_linking"
        v-for="(item, index) in address"
        :key="index"
        :to="`/${item.link}`"
      >
        {{ item.title }}</router-link
      >
    </div>
    <div class="margincentered">
      <router-view class="output"></router-view>
    </div>
    <button @click="give1()">work</button>
  </div>
  <HomePage v-if="false" @forapp="(object) => give(object)" />
  <StaffInfo v-if="false" :forstaff="forstaff" />
</template>

<script>
import StaffInfo from "@/components/StaffInfo.vue";
import HomePage from "@/pages/HomePage.vue";
export default {
  name: "App",
  methods: {
    give(object) {
      object = this.forstaff;
      console.log(object, "hello");
    },
    give1() {
      console.log(this.forstaff, "hi");
    },
  },
  data() {
    return {
      forstaff: "",
      address: [
        {
          title: "Main",
          link: "home",
        },
        {
          title: "Staff",
          link: "staff",
        },
        {
          title: "Help",
          link: "help",
        },
        {
          title: "Maps",
          link: "maps",
        },
        {
          title: "Logout",
          link: "logout",
        },
      ],
    };
  },
  components: { StaffInfo, HomePage },
};
</script>

<style lang="scss">
@import "/src/styles/app";
</style>
