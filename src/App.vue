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
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      address: [
        {
          title: "Main",
          link: "home",
        },
        {
          title: "Production",
          link: "production",
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
  components: {},
};
</script>

<style lang="scss">
@import "/src/styles/app";
</style>
