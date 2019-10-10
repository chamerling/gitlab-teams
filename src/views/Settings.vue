<template>
  <div class="pa-3">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title class="white--text">GitLab API Configuration</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="body-1 mb-3">
                You must define the 'Personal Access Token' (with <b>api</b> scope) and the 'GitLab URL' you want to use. More information on how to set this is available <a href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html" target="_blank">on the GitLab documentation</a>.
                Nothing is sent to any other server than the one you define here.
                Everything is stored locally, right in your browser.
              </div>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="apiToken"
                  label="Personal Access Token"
                  :rules="tokenRules"
                  :type="showToken ? 'text' : 'password'"
                  required
                  :append-icon="showToken ? 'visibility' : 'visibility_off'"
                  @click:append="showToken = !showToken"
                ></v-text-field>
                <v-text-field
                  v-model="apiEndpoint"
                  label="GitLab URL"
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
                Go!
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card class="elevation-12 mt-5">
            <v-toolbar dark>
              <v-toolbar-title class="white--text">Desktop Notification</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="body-1 mb-3">
                Allows to be notified on your GitLab activity.
                <v-switch
                  disabled
                  color="primary"
                  v-model="desktopNotification"
                  :label="desktopNotification ? 'Enabled' : 'Disabled'"
                ></v-switch>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="elevation-12 mt-5">
            <v-toolbar dark>
              <v-toolbar-title class="white--text">Theme</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="body-1 mb-3">
                Select light or dark mode.
                <v-switch
                  color="primary"
                  v-model="darkMode"
                  :label="darkMode ? 'Dark' : 'Light'"
                ></v-switch>
              </div>
            </v-card-text>
          </v-card>

          <v-card v-if="isConfigured" class="elevation-12 mt-5">
            <v-toolbar dark>
              <v-toolbar-title class="white--text">Clean data</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="body-1 mb-3">
                Everything which has been stored locally in this browser will be deleted.
                You will have to configure everything again in this case.
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="cleanAll">
                Clean
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
      tokenRules: [v => !!v || "Token is required"],
      urlRules: [
        v => !!v || "URL is required",
        v =>
          // eslint-disable-next-line
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
            v
          ) || "URL is not valid"
      ],
      localApiToken: null,
      localApiEndpoint: null,
      showToken: false,
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
