import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface EmailProps {
  company: { name: string }
  employee: {
    name: string
  }
  invitee: {
    name: string
  }
  email: string
  link: string
}

export const newEmployeeTemplate = ({
  company,
  employee,
  invitee,
  email,
  link,
}: EmailProps) => {
  const previewText = `Welcome to ${company.name}`
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 mt-[30px] mb-[70px] mx-0">
              Welcome to <strong>{company.name}</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {employee.name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You have been invited to join {company.name} by {invitee.name}.
              Please sign in by clicking on button below.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={link}
              >
                Continue to platform
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
}

newEmployeeTemplate.PreviewProps = {
  company: { name: "Mango HR", image: "string" },
  employee: { name: "nandan" },
  invitee: { name: "kundan" },
  email: "enauk",
  link: "link",
}

export default newEmployeeTemplate
