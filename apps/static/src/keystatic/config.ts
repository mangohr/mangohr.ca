import { config } from "@keystatic/core"

import { brand } from "./brand"
import { pagesCollection, postCollection } from "./collections"
import { navigationSingleton, settingsSingleton } from "./singletons"
import { storage } from "./utils"

export default config({
  storage,
  ui: {
    brand,
  },
  collections: {
    pages: pagesCollection,
    posts: postCollection,
  },
  singletons: {
    navigation: navigationSingleton,
    settings: settingsSingleton,
  },
})

// export default config({
//   storage,
//   ui: {
//     brand: {
//       name: siteConfig.site.name,
//     },
//   },
//   singletons: {
//     home: singleton({
//       label: "Home",
//       path: "content/pages/home/",
//       entryLayout: "form",

//       previewUrl: makePreview("/"),
//       schema: {
//         heroImg: fields.image({
//           label: "Hero Image",
//           directory: "public/uploads/home",
//           publicPath: "/uploads/home/",
//         }),
//         heroImgClass: fields.text({ label: "Hero Image Class Names" }),
//         audio: fields.relationship({
//           label: "Audio",
//           collection: "audios",
//         }),
//         title: fields.text({
//           label: "Title",
//           multiline: true,
//           defaultValue: "Rahi Gurav.",
//         }),
//         designation: fields.text({
//           label: "Designation",
//           multiline: true,
//           defaultValue:
//             "Travel Journalist | Tour Manager | Production & Content Writer",
//         }),
//         bio: fields.text({
//           label: "A bit about you",
//           multiline: true,
//           defaultValue:
//             "Storytelling on camera is home to me. I see myself travelling the world and giving an experience to the people through my lenses and writeups. Confident, ambitious, great communicator, brave, mindful and a fast learner",
//         }),
//       },
//     }),

//     about: singleton({
//       label: "About",
//       path: "content/pages/about/",
//       previewUrl: makePreview("/about"),

//       schema: {
//         title: fields.text({
//           label: "Title",
//           defaultValue: "About Page",
//         }),
//         summary: fields.text({
//           label: "Summary",
//           multiline: true,
//           defaultValue: "A bit information about me",
//         }),
//         content: fields.markdoc({
//           options: {
//             image: {
//               directory: "/public/uploads/rte/",
//               publicPath: "/uploads/rte/",
//               transformFilename(originalFilename) {
//                 return originalFilename
//               },
//             },
//           },
//           label: "Content",
//           //   componentBlocks: ComponentBlocks,
//         }),
//         jobs: fields.array(
//           fields.object(
//             {
//               title: fields.text({
//                 label: "Company / Project",
//                 validation: { length: { min: 1 } },
//               }),
//               icon: fields.image({
//                 label: "Icon",
//                 directory: "/public/uploads/jobs/",
//                 publicPath: "/uploads/jobs/",
//               }),
//               start_date: fields.date({
//                 label: "Start Date",
//                 validation: { isRequired: true },
//               }),
//               end_date: fields.date({ label: "End Date" }),
//               designation: fields.text({ label: "Designation " }),
//             },
//             {
//               layout: [9, 3, 6, 6, 12],
//             }
//           ),
//           {
//             label: "Jobs",
//             itemLabel: (props) =>
//               props?.fields?.designation.value +
//                 " - " +
//                 props.fields.title.value || "",
//           }
//         ),
//       },
//     }),
//     settings: singleton({
//       label: "Settings",
//       path: "content/pages/settings/",

//       schema: {
//         site: fields.object(
//           {
//             icon: fields.file({
//               label: "Site Icon",
//               directory: "/public/uploads/site-icon",
//               publicPath: "/uploads/site-icon",
//             }),
//             title: fields.text({ label: "Site Name" }),
//             summary: fields.text({
//               label: "Site Meta Description",
//               multiline: true,
//             }),
//           },
//           { label: "Site Configuration" }
//         ),
//         posts: fields.object(
//           {
//             title: fields.text({ label: "Page Title" }),
//             summary: fields.text({
//               label: "Page Meta Description",
//               multiline: true,
//             }),
//           },
//           { label: "Posts Page Details" }
//         ),

//         audio: fields.object(
//           {
//             title: fields.text({ label: "Page Title" }),
//             summary: fields.text({
//               label: "Page Meta Description",
//               multiline: true,
//             }),
//           },
//           { label: "Audio Page Details" }
//         ),
//         contact: fields.object(
//           {
//             email: fields.text({
//               label: "Email",
//               // description: "www.linkedin.com/in/kundan-bhosale/",
//             }),
//             phone: fields.text({
//               label: "Phone",
//               // description: "www.linkedin.com/in/kundan-bhosale/",
//             }),
//             meeting_link: fields.url({
//               label: "Meeting link",
//               // description: "www.linkedin.com/in/kundan-bhosale/",
//             }),
//           },
//           { label: "Contact Details" }
//         ),
//         social: fields.object(
//           {
//             linkedin: fields.url({
//               label: "Linkedin",
//               // description: "www.linkedin.com/in/kundan-bhosale/",
//             }),
//             instagram: fields.url({
//               label: "Instagram",
//               // description: "www.linkedin.com/in/kundan-bhosale/",
//             }),
//             facebook: fields.url({
//               label: "Facebook",
//               // description: "www.linkedin.com/in/kundan-bhosale/",
//             }),
//             x: fields.url({
//               label: "X.com",
//               // description: "www.linkedin.com/in/kundan-bhosale/",
//             }),
//             youtube: fields.url({
//               label: "Youtube",
//               // description: "www.linkedin.com/in/kundan-bhosale/",
//             }),
//           },
//           {
//             label: "Social Links",
//             description: "Add your social media links here...",
//             layout: [6, 6, 6, 6, 12],
//           }
//         ),
//       },
//     }),
//   },
//   collections: {
//     authors: collection({
//       label: "Authors",
//       path: "content/authors/*",

//       slugField: "name",
//       schema: {
//         name: fields.slug({
//           name: {
//             label: "Name",
//             validation: {
//               length: {
//                 min: 1,
//               },
//             },
//           },
//         }),
//         avatar: fields.image({
//           label: "Author avatar",
//           directory: "public/uploads/authors",
//           publicPath: "/uploads/authors/",
//         }),
//       },
//     }),
//     posts: collection({
//       label: "Posts",
//       path: "content/posts/*/",
//       previewUrl: makePreview("/posts/{slug}"),

//       slugField: "title",
//       entryLayout: "content",
//       format: {
//         contentField: "content",
//       },
//       schema: {
//         title: fields.slug({
//           name: {
//             label: "Title",
//           },
//         }),
//         summary: fields.text({
//           label: "Summary",
//           validation: { length: { min: 4 } },
//         }),
//         publishedDate: fields.date({
//           label: "Published Date",
//           defaultValue: new Date().toISOString().split("T")[0],
//         }),
//         coverImage: fields.image({
//           label: "Image",
//           directory: "public/uploads/posts",
//           publicPath: "/uploads/posts",
//         }),
//         wordCount: fields.integer({
//           label: "Word count",
//         }),
//         authors: fields.array(
//           fields.relationship({
//             label: "Post author",
//             collection: "authors",
//           }),
//           {
//             label: "Authors",
//             validation: { length: { min: 1 } },
//             itemLabel: (props) => props.value || "Please select an author",
//           }
//         ),
//         content: fields.markdoc({
//           label: "Content",
//           options: {
//             image: {
//               directory: "/public/uploads/rte/",
//               publicPath: "/uploads/rte/",
//               transformFilename(originalFilename) {
//                 return originalFilename
//               },
//             },
//           },
//         }),
//       },
//     }),
//     showcase: collection({
//       label: "Showcase",
//       path: "content/showcase/*/",
//       previewUrl: makePreview("/showcase"),
//       slugField: "title",
//       schema: {
//         title: fields.slug({
//           name: {
//             label: "Title",
//           },
//           slug: {
//             label: "SEO-friendly slug",
//           },
//         }),
//         publishedDate: fields.date({
//           label: "Published Date",
//           defaultValue: new Date().toISOString().split("T")[0],
//         }),
//         image: fields.image({
//           label: "Image",
//           directory: "public/uploads/showcase",
//           publicPath: "/uploads/showcase/",
//         }),
//         summary: fields.text({ label: "Summary", multiline: true }),
//         data: fields.conditional(
//           fields.select({
//             label: "Content Type",
//             options: [
//               { label: "External Link", value: "link" },
//               { label: "Audio", value: "audio" },
//               { label: "Post", value: "post" },
//               { label: "Custom Content", value: "content" },
//             ],
//             defaultValue: "link",
//           }),
//           {
//             link: fields.url({ label: "URL" }),
//             audio: fields.relationship({
//               label: "Audio",
//               collection: "audios",
//             }),
//             post: fields.relationship({
//               label: "Post",
//               collection: "posts",
//             }),
//             content: fields.markdoc({
//               options: {
//                 image: {
//                   directory: "/public/uploads/rte/",
//                   publicPath: "/uploads/rte/",
//                   transformFilename(originalFilename) {
//                     return originalFilename
//                   },
//                 },
//               },
//               label: "Content",
//               //   componentBlocks: ComponentBlocks,
//             }),
//           }
//         ),
//       },
//     }),
//     services: collection({
//       label: "Services",
//       path: "content/services/*/",
//       previewUrl: makePreview("/services"),
//       slugField: "title",
//       schema: {
//         title: fields.slug({
//           name: {
//             label: "Title",
//           },
//           slug: {
//             label: "SEO-friendly slug",
//           },
//         }),
//         publishedDate: fields.date({
//           label: "Published Date",
//           defaultValue: new Date().toISOString().split("T")[0],
//         }),
//         image: fields.image({
//           label: "Image",
//           directory: "public/uploads/services",
//           publicPath: "/uploads/services/",
//         }),
//         summary: fields.text({ label: "Summary", multiline: true }),
//         content: fields.markdoc({
//           options: {
//             image: {
//               directory: "/public/uploads/rte/",
//               publicPath: "/uploads/rte/",
//               transformFilename(originalFilename) {
//                 return originalFilename
//               },
//             },
//           },
//           label: "Content",
//           //   componentBlocks: ComponentBlocks,
//         }),
//       },
//     }),
//     audios: collection({
//       label: "Audios",
//       path: "content/audios/*/",
//       previewUrl: makePreview("/audios"),
//       slugField: "title",
//       schema: {
//         title: fields.slug({
//           name: {
//             label: "Title",
//           },
//           slug: {
//             label: "SEO-friendly slug",
//           },
//         }),
//         publishedDate: fields.date({
//           label: "Published Date",
//           defaultValue: new Date().toISOString().split("T")[0],
//         }),
//         audioFile: fields.file({
//           label: "Audio File",
//           directory: "public/uploads/audios",
//           publicPath: "/uploads/audios/",
//           validation: {
//             isRequired: true,
//           },
//         }),
//         image: fields.image({
//           label: "Cover Image",
//           directory: "public/uploads/audios",
//           publicPath: "/uploads/audios/",
//         }),
//         summary: fields.text({ label: "Summary", multiline: true }),
//         content: fields.markdoc({
//           options: {
//             image: {
//               directory: "/public/uploads/rte/",
//               publicPath: "/uploads/rte/",
//               transformFilename(originalFilename) {
//                 return originalFilename
//               },
//             },
//           },
//           label: "Content",
//           //   componentBlocks: ComponentBlocks,
//         }),
//       },
//     }),
//   },
// })
