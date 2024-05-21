import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import IRecipe, { deleteData, getRecipe } from "../../features/recipes";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, List, Modal, Skeleton } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

export const Recipe = () => {
  const dispatch = useAppDispatch();
  const { isLoading, recipes } = useAppSelector((state) => state.recipe);
  const navigate = useNavigate();

  const [selectedData, setSelectedData] = useState<IRecipe | null>(null);

  const handleCardClick = (contact: IRecipe) => {
    setSelectedData(contact);
    showModal();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getRecipe());
  }, []);

  const deleteHandler = (id: string) => {
    dispatch(deleteData(id));
    handleCancel();
  };
  return (
    <div className="hero">
      <div>
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
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={recipes}
              renderItem={(recipe) => (
                <List.Item>
                  <Col span={12}>
                    <Card
                      cover={
                        <img
                          alt={recipe.name}
                          src={recipe.image}
                          className="img-card"
                        />
                      }
                      hoverable
                    >
                      <Card.Meta title={recipe.name} />
                      <div style={{ marginTop: 20 }}>
                        <Button
                          type={"dashed"}
                          onClick={() => handleCardClick(recipe)}
                        >
                          View
                        </Button>
                      </div>
                    </Card>
                  </Col>
                </List.Item>
              )}
            />
            <Modal
              title="Food recipes"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {selectedData && (
                <>
                  <img
                    alt={selectedData.name}
                    src={selectedData.image}
                    style={{ height: 200, objectFit: "contain" }}
                  />
                  <p>Name: {selectedData.name}</p>
                  <p>Description: {selectedData.text}</p>
                  <p>Complexity: {selectedData.hard}</p>
                  <Button
                    icon={<EditOutlined />}
                    style={{ marginRight: 10 }}
                    type={"primary"}
                    onClick={() => navigate(`/${selectedData?.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    icon={<DeleteOutlined />}
                    type={"primary"}
                    onClick={() => deleteHandler(selectedData?.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};
