<template>
  <div></div>
</template>

<script>
export default {
  name: "NewOAuthToken",
  props: {
    accessToken: { type: String, required: true },
    state: String,
    tokenType: { type: String, required: true },
    expiresIn: String
  },
  beforeMount() {
    if (!this.expiresIn) {
      let now = new Date();
      now.setFullYear(now.getFullYear() + 1);
      this.expiresIn = now.toISOString();
    }
  },
  mounted() {
    localStorage.setItem(
      "oauthToken",
      JSON.stringify({
        accessToken: this.accessToken,
        tokenType: this.tokenType,
        expiresIn: this.expiresIn
      })
    );

    window.dispatchEvent(new Event("processComplete"));
    window.close();
  }
};
</script>
