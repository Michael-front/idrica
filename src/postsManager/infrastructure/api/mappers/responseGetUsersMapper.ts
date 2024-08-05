import { ApiResponseUser } from "../rtkQueryClient/postsApiRTK";
import { User } from "src/postsManager/core/domain/entities/User";

export const responseGetUserMapper = (apiResponseUsers: ApiResponseUser[] | undefined): User[] | undefined => {
  const result: User[] | undefined = apiResponseUsers?.map(({ username, email }) => ({
    user: username,
    email,
    password: "1234", // As this API does not require a password, I use "1234" to login. Anyway, the password should be encrypted, but this is only an example, so I use plain text.
  }));

  return result;
};
