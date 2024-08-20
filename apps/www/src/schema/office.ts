import { z } from "zod";
import { scopeIds } from "@/constants/scopes";

const schema = {
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  active: z.boolean().catch(true),
};

const create = z.object(schema);

const update = z.object({
  id: z.coerce.number().int(),
  ...schema,
});

const officeSchema = {
  get: {
    scope: scopeIds["read:office"],
    validate: null,
  },
  create: {
    scope: scopeIds["create:office"],
    validate: create,
  },
  update: {
    scope: scopeIds["update:office"],
    validate: update,
  },
  delete: {
    scope: scopeIds["delete:office"],
    validate: z.string(),
  },
};

export default officeSchema;
