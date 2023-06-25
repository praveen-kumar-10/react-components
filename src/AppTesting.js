import Button from "components/button/Button";
import React from "react";

const AppTesting = () => {
  return (
    <div className="d-flex flex-column flex-wrap gap-2 p-4">
      <ButtonTesting />
    </div>
  );
};

export default AppTesting;

const ButtonTesting = () => {
  return (
    <div className="d-flex gap-2">
      <Button onClick={() => alert("Hello")}>Simple Button</Button>
      <Button isLoading loaderPosition="end">
        isLoading
      </Button>
      <Button
        isLoading
        isLoader={true}
        loader={<>Icon </>}
        loadingIndicator="Loading..."
      >
        isLoading
      </Button>
    </div>
  );
};
