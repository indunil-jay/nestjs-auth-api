import { Injectable } from '@nestjs/common';
import { PolicyHandler } from './interfaces/policy-handler.interface';
import { Policy } from './interfaces/policy.interface';
import { IActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { PolicyHandlerStorage } from './policy-handlers.storage';

export class FrameworkContributorPolicy implements Policy {
  name = 'frameworkContributor';
}

@Injectable()
export class FrameworkContributorPolicyHanlder
  implements PolicyHandler<FrameworkContributorPolicy>
{
  constructor(private readonly policyHanlderStorage: PolicyHandlerStorage) {
    this.policyHanlderStorage.add(FrameworkContributorPolicy, this);
  }

  async handle(
    policy: FrameworkContributorPolicy,
    user: IActiveUserData,
  ): Promise<void> {
    const isContributor = user.email.endsWith('@nestjs.com');
    if (!isContributor) {
      throw new Error('User is not a contributor.');
    }
  }
}
