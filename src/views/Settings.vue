<template>
  <div>
    <v-tabs v-model="tabs" :grow="true">
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="(item, idx) in authenticationMethods" :key="idx"> {{ item.text }} </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="(item, idx) in authenticationMethods" :key="idx">
        <component :is="item.component" :on-save="save"></component>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PersonnalTokenSettings from "@/components/PersonalTokenSettings";
import OAuthTokenSettings from "@/components/OAuthTokenSettings";
import { constants } from "@/store/utils";
import gitlab from "@/gitlab";

export default {
  name: "settings",
  components: {
    "oauth-token-settings": OAuthTokenSettings,
    "personal-token-settings": PersonnalTokenSettings
  },
  data() {
    return {
      tabs: undefined
    };
  },
  computed: {
    ...mapState(["authenticationMethod"]),
    authenticationMethods() {
      return [
        {
          text: "Oauth",
          component: OAuthTokenSettings,
          authenticationMethod: constants.authenticationMethod.OAUTH
        },
        {
          text: "Personnal token",
          component: PersonnalTokenSettings,
          authenticationMethod: constants.authenticationMethod.PERSONAL
        }
      ];
    }
  },
  methods: {
    save() {
      this.$store.commit("setAuthenticationMethod", this.authenticationMethods[this.tabs].authenticationMethod);
      gitlab.get().updateClient();
    }
  },
  beforeMount() {
    const idx = this.authenticationMethods.findIndex(it => it.authenticationMethod === this.authenticationMethod);
    this.tabs = idx >= 0 ? idx : 0;
  }
};
</script>
