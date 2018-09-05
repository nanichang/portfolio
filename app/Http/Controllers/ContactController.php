<?php

	namespace App\Http\Controllers;

	use Illuminate\Http\Request;
	use App\Repositories\Contact\ContactContract;
	use Session;

	class ContactController extends Controller
	{

		protected $repo;

		public function __construct(ContactContract $contactContract) {
			$this->repo = $contactContract;
		}

	    public function postContact(Request $request) {
	        
			$this->validate($request, [
				'name' => 'required',
				'email' => 'required',
				// 'subject' => 'required',
				'message' => 'required',
			]);

			$data = array(
				'name' => $request->email,
				'email' => $request->subject,
				'phone' => $request->phone,
				'bodyMessage' => $request->message,
			);

			dd($data);

			Mail::send('emails.contact', $data, function($message) use ($data) {
				$message->from($data['email']);
				$message->to('nanipaul68@gmail.com');
				$message->subject($data['subject']);
			});

			$notification = array(
				'message' => 'Message Sent successfully',
				'alert-type' => 'success'
			);
			
			Session::flash('success', 'Message Sent Successfully. Someone will contact you soon via Email.');

			return redirect()->back()->with($notification);
	    }
	}
