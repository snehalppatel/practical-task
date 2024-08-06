import { IProduct } from "@/types";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

interface ReviewsDialogProps {
  product: IProduct | "loading" | null;
  onClose: () => void;
}

// Function to get relative time from a date, usually in separate utility file, exporting for testing
export function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  // If the particular difference is more than one unit, return the plural form
  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  else if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  else if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  else if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  else if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  else return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
}

function ReviewsDialog({ product, onClose }: ReviewsDialogProps) {
  const loading = product === "loading";

  // Handle the loading state with a skeleton loader

  return (
    // if product is not null, show the dialog (product stays null until it is clicked)
    <Dialog open={product !== null} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {!loading ? (
          product?.title
        ) : (
          <Skeleton data-testid="skeleton-loader" height={32} />
        )}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {!loading
            ? product?.reviews.map((review, i) => (
                <Card variant="outlined" key={i}>
                  <CardContent sx={{ p: "1rem !important" }}>
                    <Stack direction="row" justifyContent="space-between">
                      <div>
                        <Typography>{review.reviewerName}</Typography>
                        <Typography variant="body2">
                          {review.reviewerEmail}
                        </Typography>
                      </div>
                      <Typography variant="body2">
                        {getRelativeTime(new Date(review.date))}
                      </Typography>
                    </Stack>
                    <Rating
                      name="review-rating"
                      data-testid="review-rating"
                      value={review.rating}
                      readOnly
                    />
                    <Typography variant="subtitle2">
                      {review.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} variant="outlined">
                  <CardContent sx={{ p: "1rem !important" }}>
                    <Stack direction="row" justifyContent="space-between">
                      <div>
                        <Skeleton height={24} width={100} />
                        <Skeleton height={20} width={150} />
                      </div>
                      <Skeleton width={100} height={24} />
                    </Stack>
                    <Skeleton height={24} />
                    <Skeleton height={22} />
                  </CardContent>
                </Card>
              ))}
        </Stack>
        <Button onClick={onClose} variant="outlined" fullWidth sx={{ mt: 2 }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewsDialog;
