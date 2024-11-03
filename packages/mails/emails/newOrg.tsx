import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components"

interface EmailProps {
  company: { name: string }
  creator: {
    name: string
  }
  name: string
  email: string
}

export const newOrgTemplate = ({
  company,
  creator,
  email,
  name,
}: EmailProps) => {
  const previewText = `Company (${company.name}) added by ${creator.name}.`
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 mt-[30px] mb-[70px] mx-0">
              New Company Added!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              A new company named {company.name} was created by {creator.name}.
              Please sign in by clicking on button below.
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for{" "}
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
}

newOrgTemplate.PreviewProps = {
  company: { name: "Mango HR" },
  creator: { name: "nandan" },
  email: "enauk",
  name: "Kundan",
  link: "link",
}

export default newOrgTemplate
