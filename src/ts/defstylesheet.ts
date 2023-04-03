export default function defstylesheet(config: any[]) {
  if (config.length === 0) {
    return;
  }
  for (let i = 0; i < config.length; i++) {
    if (config[i].hasOwnProperty("primarycolor")) {
      if (config[i].primarycolor !== "") {
        document.documentElement.style.setProperty(
          "--primary-color",
          config[i].primarycolor
          );
      } else {
        document.documentElement.style.setProperty(
          "--primary-color",
          "#2e7d32"
        );
      }
    }
    if (config[i].hasOwnProperty("secondarycolor")) {
      if (config[i].secondarycolor !== "") {
        document.documentElement.style.setProperty(
          "--secondary-color",
          config[i].secondarycolor
        );
        }
        else {
          document.documentElement.style.setProperty(
            "--secondary-color",
            "#f9fbe7"
          );
        }
    }
  }
  return;
}
