import * as React from "react"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  render,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface MagicEmailProps {
  name: string
  email: string
  link: string
}

export const magicLinkTemplate = ({ name, email, link }: MagicEmailProps) => {
  const previewText = `Sign in to MangoHR`
  const subject =
    "Here's your magic link, you can use to sign in to MangoHR platform."

  const text = `Hello ${name},\nHere's your magic link, you can sign in to MangoHR platform by
              clicking on link below. This link will only be valid for next 30
              minutes.\n\n${link}`

  const jsx = (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${process.env.WWW_URL}/assets/logo/ico.png`}
                width="40"
                height="37"
                alt="Mango HR"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Sign in to <strong>Mango HR</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Here's your magic link, you can sign in to MangoHR platform by
              clicking on button below. This link will only be valid for next 30
              minutes.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={link}
              >
                Login to MangoHR
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={link} className="text-blue-600 no-underline">
                {link}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black">{email}</span>. If you were not
              expecting this invitation, you can ignore this email. If you are
              concerned about your account's safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )

  return { subject, text, render: () => render(jsx) }
}

export default () => {
  return <div>hi</div>
}

// () =>
//   magicLinkTemplate({
//     name: "{{name}}",
//     email: "{{email}}",
//     magicLink: "{{magicLink}}",
//   }).render
