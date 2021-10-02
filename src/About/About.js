import React from 'react';
import { Card, CardBody, CardHeader, Container, Col, CardFooter } from 'reactstrap';

export default function About(props) {
    return (
        <Container fluid className={"p-5"}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Card>
                    <CardHeader>
                        <h2>
                             Hế lô cô Mai &lt;3
                        </h2>
                    </CardHeader>
                    <CardBody>
                        <Container>
                            <p>Đây là một chiếc trang web giúp cho cô Mai điền thực đơn theo tuần cho Béo.
                            Các tuần sẽ tự động được tạo như 1 chiếc lịch online cô Mai chỉ cần lên và điền thui!
                            Trên chiếc web nì cô Mai cũng có thể <b>Xem lại các thực đơn cũ</b> và
                            <b> Nhiều thứ hay ho nữa!!!</b>. <br/>
                            Cô Mai có thể bắt đầu ở <a href="/schedule">đây</a> nhá!</p>
                        </Container>
                    </CardBody>
                    <CardFooter>
                         Béo yêu em nắm &lt;3
                    </CardFooter>
                </Card>
            </Col>
        </Container>

    );
}
