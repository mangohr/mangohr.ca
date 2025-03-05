import { fields, singleton } from "@keystatic/core"

export const settingsSingleton = singleton({
  label: "Site Settings",
  path: "content/pages/settings/",
  schema: {
    site: fields.object(
      {
        icon: fields.file({
          label: "Site Icon",
          directory: "/public/uploads/images",
          publicPath: "/uploads/images",
          transformFilename(originalFilename) {
            return originalFilename
          },
        }),
        title: fields.text({ label: "Site Name" }),
        summary: fields.text({
          label: "Site Meta Description",
          multiline: true,
        }),
      },
      { label: "Site Configuration" }
    ),
    contact: fields.object(
      {
        email: fields.text({
          label: "Email",
          // description: "www.linkedin.com/in/kundan-bhosale/",
        }),
        phone: fields.text({
          label: "Phone",
          // description: "www.linkedin.com/in/kundan-bhosale/",
        }),
        meeting_link: fields.url({
          label: "Meeting link",
          // description: "www.linkedin.com/in/kundan-bhosale/",
        }),
      },
      { label: "Contact Details" }
    ),
    social: fields.object(
      {
        linkedin: fields.url({
          label: "Linkedin",
          // description: "www.linkedin.com/in/kundan-bhosale/",
        }),
        instagram: fields.url({
          label: "Instagram",
          // description: "www.linkedin.com/in/kundan-bhosale/",
        }),
        facebook: fields.url({
          label: "Facebook",
          // description: "www.linkedin.com/in/kundan-bhosale/",
        }),
        x: fields.url({
          label: "X.com",
          // description: "www.linkedin.com/in/kundan-bhosale/",
        }),
        youtube: fields.url({
          label: "Youtube",
          // description: "www.linkedin.com/in/kundan-bhosale/",
        }),
      },
      {
        label: "Social Links",
        description: "Add your social media links here...",
        layout: [6, 6, 6, 6, 12],
      }
    ),
  },
})
