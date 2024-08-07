import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Form } from 'react-bootstrap'

const schema = z.object({
  name: z
    .string({
      required_error: "Name must be a string",
    })
    .min(1, { message: "Name is required" }),
  email: z
    .string({
      required_error: "Email must be a string",
    })
    .min(1,{ message: "Invalid email address" }),
  phonenumber: z.string({
        required_error: "Number is required"
    }).min(1, {message: "Invalid phone number"})
});

export default function Contact() {
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phonenumber: ""
    },
  });

  console.log(formState.errors);

  const onSubmit = (values) => {
    console.log(values);
  };
  


  return (
    <div>
      <NavigationBar />
        <Container className='contact'>
      <Form onSubmit={handleSubmit(onSubmit)} className="contact">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter Name" 
              {...field} 
              className="field"/>

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type="email" 
              placeholder="Enter Email" 
              {...field} 
              className="field"/>

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />

        <Controller
          name="phonenumber"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
              type="number" 
              placeholder="Enter phone number" 
              {...field} 
              className="field"/>

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />

        <Controller
          name="comment"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Leave a comment" 
              {...field} 
              className="field" rows={3}/>

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />

        <Button variant="primary" type="submit" className="submit">
          Send Message
        </Button>
      </Form>
    </Container>
    </div>
  )
}