// const { useState, useEffect } = React;
// const { Checkbox, Group } = MantineCore;
// const { useFormContext } = Form;

// function FileUploadPage() {
//   const { ctx, screenId } = useFlowViewer();

//   const primary = ctx.getContact.primary === "yes" ? true : false;
//   const valid = ctx.getContact.valid === "yes" ? true : false;
//   const verified = ctx.getContact.verified === "yes" ? true : false;

//   console.log("primary", primary);
//   console.log("valid", valid);
//   console.log("verified", verified);

//   const { setValue, watch } = useFormContext({
//     defaultValues: {
//       primary,
//       valid,
//       verified,
//     },
//   });
//   const contact = watch()[screenId];

//   return (
//     <Group mt="xl" gap="2rem">
//       <Checkbox
//         id="primary"
//         label="Primary"
//         checked={contact.primary}
//         onChange={(event) => {
//           let value = event.currentTarget.checked;
//           if (value) {
//             setValue(`${screenId}`, {
//               ...contact,
//               primary: value,
//               valid: value,
//             });
//             return;
//           }
//           setValue(`${screenId}`, {
//             ...contact,
//             primary: value,
//           });
//         }}
//       />
//       <Checkbox
//         id="valid"
//         label="Valid"
//         checked={contact.valid}
//         onChange={(event) => {
//           let value = event.currentTarget.checked;
//           if (!contact.primary) {
//             setValue(`${screenId}`, {
//               ...contact,
//               valid: value,
//             });
//           }
//           return;
//         }}
//       />
//       <Checkbox
//         id="verified"
//         label="Verified"
//         checked={contact.verified}
//         onChange={(event) => {
//           let value = event.currentTarget.checked;
//           setValue(`${screenId}`, {
//             ...contact,
//             verified: value,
//           });
//         }}
//       />
//     </Group>
//   );
// }
// export default FileUploadPage;
