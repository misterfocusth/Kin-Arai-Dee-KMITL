import { Loader } from "@mantine/core";

export default function MyLoader() {
  return (
    <div className="flex min-h-screen min-w-screen justify-center items-center">
      <Loader color="yellow" size="xl" variant="dots" />
    </div>
  );
}
