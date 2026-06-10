import { List, ListItem, Skeleton } from "@mui/material";

const SKELETON_COUNT = 8

export function ListSkeleton() {
  return (
    <List>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <ListItem key={index} divider>
          <Skeleton variant="text" width="60%" height={32} />
        </ListItem>
      ))}
    </List>
  );
}