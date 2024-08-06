import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
  Typography,
} from "@mui/material";

function RatingProgress({
  value,
  ...props
}: CircularProgressProps & { value: number }) {
  const percent = (value / 5) * 100;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {/* Greyish progress to add background bar */}
      <CircularProgress
        variant="determinate"
        value={100}
        sx={{ color: (theme) => theme.palette.grey[300] }}
        thickness={5}
        {...props}
      />
      {/* Main progress */}
      <CircularProgress
        variant="determinate"
        sx={{
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: { strokeLinecap: "round" }, // for rounded corners
        }}
        value={percent}
        size={40}
        thickness={5}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export { RatingProgress };
