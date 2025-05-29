import PasswordModel from "../schemas/password.schema";
import bcrypt from "bcrypt";

class PasswordService {
    public async createOrUpdate(data: any) {
        const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, { $set: { password: data.password } }, { new: true });
        if (!result) {
            const dataModel = new PasswordModel({ userId: data.userId, password: data.password });
            return await dataModel.save();
        }
        return result;
    }

    public async authorize(userId: string, password: string) {
        try {
            const passwordEntry = await PasswordModel.findOne({ userId });

            if (!passwordEntry) {
                throw new Error("Password not found");
            }

            const isMatch = await bcrypt.compare(password, passwordEntry.password);
            if (!isMatch) {
                throw new Error("Invalid password");
            }
        } catch (error) {
            console.error("Wystąpił błąd podczas tworzenia danych:", error);
            throw new Error("Wystąpił błąd podczas tworzenia danych");
        }
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hash", hashedPassword);
        return hashedPassword;
    }
}

export default PasswordService;
