import { ChangeEvent, FormEvent, useState } from "react";
import isValidHttpUrl from "../../utils/vaildImage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { addNewRecipe } from "../../features/recipes";
import { Button, Input, List, message, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";

export const NewRecipe = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { isLoading } = useAppSelector((state) => state.recipe);
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Сохранен",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Ошибка",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Заполните все поля",
    });
  };

  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: "",
    hard: 0,
    text: "",
    image: "",
  });

  const onInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      form.name.trim() === "" ||
      form.image.trim() === "" ||
      form.text === "" ||
      form.hard === 0
    ) {
      warning();
      return;
    }
    if (isValidHttpUrl(form.image)) {
      await dispatch(
        addNewRecipe({
          name: form.name,
          text: form.text,
          hard: form.hard,
          image: form.image,
        })
      );
      success();
      navigate(-1);
    } else {
      error();
    }
  };
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
          <form onSubmit={onSubmitData}>
            <Input
              name={"name"}
              value={form.name}
              type={"text"}
              placeholder={"Enter food title"}
              onChange={onInputChangeHandler}
              style={{ marginBottom: 10 }}
            />
            <TextArea
              name={"text"}
              value={form.text}
              placeholder={"Write down the recipe."}
              onChange={onInputChangeHandler}
              style={{ marginBottom: 10 }}
            />
            <Input
              name={"hard"}
              value={form.hard}
              type={"number"}
              placeholder={"Appreciate the difficulty "}
              onChange={onInputChangeHandler}
              style={{ marginBottom: 10 }}
            />
            <Input
              name={"image"}
              value={form.image}
              type={"text"}
              placeholder={"Enter food image"}
              onChange={onInputChangeHandler}
              style={{ marginBottom: 10 }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Button
                type="primary"
                className={"my-button"}
                onClick={() => navigate(-1)}
              >
                Back to contacts
              </Button>
              <button className="button-4" role="button" type="submit">
                Save
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
