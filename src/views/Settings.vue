<template>
  <div class="pa-3">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title class="white--text">{{ $t("settings.api_configuration.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="body-1 mb-3" v-html="$t('settings.api_configuration.description')"></div>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="apiToken"
                  :label="$t('settings.api_configuration.access_token')"
                  :rules="tokenRules"
                  :type="showToken ? 'text' : 'password'"
                  required
                  :append-icon="showToken ? 'visibility' : 'visibility_off'"
                  @click:append="showToken = !showToken"
                ></v-text-field>
                <v-text-field
                  v-model="apiEndpoint"
                  :label="$t('settings.api_configuration.gitlab_url')"
                  :rules="urlRules"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!valid"
                @click="submit">
                {{ $t("settings.api_configuration.save") }}
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card class="elevation-12 mt-5">
            <v-toolbar dark>
              <v-toolbar-title class="white--text">{{ $t("settings.desktop_notifications.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="body-1 mb-3">
                {{ $t("settings.desktop_notifications.description") }}
                <v-switch
                  disabled
                  color="primary"
                  v-model="desktopNotification"
                  :label="desktopNotification ? $t('generic.enabled') : $t('generic.disabled')"
                ></v-switch>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="elevation-12 mt-5">
            <v-toolbar dark>
              <v-toolbar-title class="white--text">{{ $t("settings.theme.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="body-1 mb-3">
                {{ $t("settings.theme.description") }}
                <v-switch
                  color="primary"
                  v-model="darkMode"
                  :label="darkMode ? $t('settings.theme.themes.dark') : $t('settings.theme.themes.light')"
                ></v-switch>
              </div>
            </v-card-text>
          </v-card>

          <v-card v-if="isConfigured" class="elevation-12 mt-5">
            <v-toolbar dark>
              <v-toolbar-title class="white--text">{{ $t("settings.clean_data.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="body-1 mb-3">
                {{ $t("settings.clean_data.description") }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="cleanAll">
                {{ $t("settings.clean_data.clean") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "settings",
  data() {
    return {
      valid: false,
      tokenRules: [v => !!v || this.$t('settings.api_configuration.validation.token_required')],
      urlRules: [
        v => !!v || this.$t('settings.api_configuration.validation.url_required'),
        v =>
          // eslint-disable-next-line
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
            v
          ) || this.$t('settings.api_configuration.validation.url_invalid')
      ],
      localApiToken: null,
      localApiEndpoint: null,
      showToken: false
    };
  },
  computed: {
    isConfigured() {
      return this.$store.getters.isConfigured;
    },
    apiToken: {
      get() {
        return this.$store.state.settings.apiToken;
      },
      set(value) {
        this.localApiToken = value;
      }
    },
    apiEndpoint: {
      get() {
        return this.$store.state.settings.apiEndpoint;
      },
      set(value) {
        this.localApiEndpoint = value;
      }
    },
    darkMode: {
      get() {
        return this.$store.state.settings.darkMode;
      },
      set(value) {
        this.$store.dispatch("updateTheme", value);
      }
    },
    desktopNotification() {
      return this.$store.state.notification.enabled;
    }
  },
  mounted() {
    this.localApiToken = this.$store.state.settings.apiToken;
    this.localApiEndpoint = this.$store.state.settings.apiEndpoint;
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("updateSettings", {
          apiToken: this.localApiToken,
          apiEndpoint: this.localApiEndpoint
        });
        this.$router.push("/");
      }
    },
    cleanAll() {
      this.$store.dispatch("cleanAll");
      this.localApiToken = this.$store.state.apiToken;
      this.localApiEndpoint = this.$store.state.apiEndpoint;
      this.darkMode = this.$store.state.darkMode;
    }
  },
  components: {}
};
</script>
