import cron from "node-cron";
import dayjs from "dayjs";
import { User } from "../modules/user/user.model";

cron.schedule("0 2 * * *", async () => {
  try {
    const sevenDaysAgo = dayjs().subtract(7, "day").toDate();

    const result = await User.updateMany(
      {
        updatedAt: { $lt: sevenDaysAgo },
        isActive: true,
      },
      {
        $set: { isActive: false },
      }
    );
    console.log(`Deactivated ${result.modifiedCount} inactive users.`);
  } catch (error) {
    console.error("Failed to deactivate inactive users:", error);
  }
});
