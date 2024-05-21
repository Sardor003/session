import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import isValidHttpUrl from "../../utils/vaildImage";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, List, Skeleton, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editData } from "../../features/recipes";
import TextArea from "antd/es/input/TextArea";

export const EditRecipe = () => {
  const { edit } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const { isLoading, recipes } = useAppSelector((state) => state.recipe);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    hard: 0,
    name: "",
    text: "",
    image: "",
  });

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Success",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Fill in all fields",
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.image === "" ||
      formData.text.trim() === "" ||
      formData.hard === 0
    ) {
      warning();
      return;
    }

    if (isValidHttpUrl(formData.image)) {
      await dispatch(editData({ id: formData.id, payload: formData }));
      success();
      navigate(-1);
    } else {
      error();
    }
  };

  useEffect(() => {
    const index = recipes.findIndex((val) => {
      return val.id === edit;
    });

    if (index >= 0) {
      setFormData({
        ...recipes[index],
      });
    }
  }, [edit]);
  return (
    <div className="main">
      {isLoading ? (
        <List
          grid={{ gutter: 12, column: 3 }}
          dataSource={[1, 2, 3]}
          renderItem={(index) => (
            <List.Item key={index}>
              <Skeleton loading={true} active />
            </List.Item>
          )}
        />
      ) : (
        <>
          {contextHolder}
          <h2 style={{ textAlign: "center", marginBottom: 30 }}>
            Edit your foods
          </h2>
          <form onSubmit={submitData}>
            <Input
              name={"name"}
              value={formData.name}
              type={"text"}
              placeholder={"Enter a name to edit"}
              onChange={handleInputChange}
              style={{ marginBottom: 10 }}
            />
            <TextArea
              name={"text"}
              value={formData.text}
              placeholder={"Enter a email to edit"}
              onChange={handleInputChange}
              style={{ marginBottom: 10 }}
            />
            <Input
              name={"number"}
              value={formData.hard}
              type={"number"}
              placeholder={"Enter a phone to edit"}
              onChange={handleInputChange}
              style={{ marginBottom: 10 }}
            />
            <Input
              name={"image"}
              value={formData.image}
              type={"text"}
              placeholder={"Enter a image link to edit"}
              onChange={handleInputChange}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Button onClick={() => navigate(-1)}>Escape</Button>
              <button className="button-4 " type={"submit"}>
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
