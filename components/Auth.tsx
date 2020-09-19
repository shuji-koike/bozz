import { AvatarPair, Avatar, Popover } from "@primer/components"
import React, { useContext, useState } from "react"
import styled from "styled-components"
import { UserContext } from "~/components/App"
import { loginWithGithub, logout } from "~/src/firebase"
import { Button } from "./Button"
import { Form } from "./Form"
import { Input } from "./Input"

export const Auth: React.FC = () => {
  const user = useContext(UserContext)
  const [open, setOpen] = useState(false)
  if (user === undefined) {
    return <>Loadging...</>
  }
  if (!user) {
    return <Button onClick={loginWithGithub} label="Login" />
  }
  return (
    <>
      <AvatarPair>
        <StyledAvatar
          src={user?.photoURL || undefined}
          onClick={() => setOpen(!open)}
        />
      </AvatarPair>
      <Popover
        position="absolute"
        open={open}
        caret="top-right"
        top="50px"
        right="16px">
        <Popover.Content>
          <StyledForm>
            <span>{user.displayName}</span>
            <hr />
            <Input
              type="password"
              name="GITHUB_TOKEN"
              autoComplete="token"
              storage={localStorage}
            />
            <hr />
            <Button onClick={logout} label="Logout" />
          </StyledForm>
        </Popover.Content>
      </Popover>
    </>
  )
}

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 0;
  border: 4px solid #eee;
`

const StyledForm = styled(Form)``
