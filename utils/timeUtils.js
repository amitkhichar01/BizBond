import { formatDistanceToNowStrict } from "date-fns";

export const formatRelativeTime = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
        console.error("Invalid date:", date);
        return "Invalid date";
    }
    return formatDistanceToNowStrict(parsedDate, { addSuffix: true });
};
