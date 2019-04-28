import * as React from 'react'
import { inject, observer } from 'mobx-react'
import styled from '@emotion/styled'

import { CounterStore } from '../../stores'

interface IProps {
  counterStore: CounterStore
}

const Container = styled.div`
  padding: 40px;
`
const Content = styled.div`
  display: flex;
  justify-content: space-around;
`
const Counter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const Count = styled.span`
  font-size: 48px;
  color: #1e5f89;
  text-shadow: 1px 1px 4px #9e9e9e;
  margin: 0 0 42px 0;
`
const RowButton = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const Button = styled.button`
  text-align: center;
  margin: 0 0px 0 20px;
  padding: 5px 14px;
  cursor: pointer;
  @media (max-width: 500px) {
    height: 30px;
    text-align: center;
    margin: 0 0 10px 0;
  }
`

@inject('counterStore')
@observer
export class Home extends React.Component<IProps, {}> {
  private incrementCount = (inc: number) => {
    this.props.counterStore.incrementCount(inc)
  }

  private resetCount = () => {
    this.props.counterStore.resetCount()
  }

  public render() {
    const formatedCount = this.props.counterStore.formatedCount

    return (
      <Container>
        <Content>
          <Counter>
            <Count>{formatedCount}</Count>
            <RowButton>
              <Button onClick={() => this.incrementCount(-10)}>
                (-10) minus 10
              </Button>
              <Button onClick={() => this.incrementCount(-1)}>
                (-1) minus 1
              </Button>
              <Button onClick={() => this.resetCount()}>(0) zero</Button>
              <Button onClick={() => this.incrementCount(+1)}>
                (+1) plus 1
              </Button>
              <Button onClick={() => this.incrementCount(+10)}>
                (+10) plus 10
              </Button>
            </RowButton>
          </Counter>
        </Content>
      </Container>
    )
  }
}
