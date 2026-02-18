terraform {
  required_providers {
    checkly = {
      source  = "checkly/checkly"
      version = "1.17.0"
    }
  }
}

provider "checkly" {
  api_key    = var.checkly_api_key
  account_id = var.checkly_account_id
}

variable "checkly_api_key" {}
variable "checkly_account_id" {}

locals {
  locations = ["us-east-1", "us-west-2", "eu-west-1", "sa-east-1"]
}

resource "checkly_check" "hebertpaes_http" {
  name          = "hebertpaes.com-uptime"
  type          = "API"
  activated     = true
  frequency     = 1
  locations     = local.locations
  degraded_response_time_ms = 2000
  max_response_time_ms      = 4000

  request {
    method = "GET"
    url    = "https://hebertpaes.com/"
    follow_redirects = true
  }

  assertions {
    source     = "STATUS_CODE"
    comparison = "EQUALS"
    target     = 200
  }

  alert_settings {
    escalation_type = "RUN_BASED"
    run_based_escalation {
      failed_runs = 3
    }
  }
}

resource "checkly_check" "hebertpaes_lighthouse" {
  name      = "hebertpaes.com-lighthouse"
  type      = "BROWSER"
  activated = true
  frequency = 30
  locations = ["us-east-1"]

  script {
    content = file("${path.module}/scripts/lighthouse.js")
  }

  alert_settings {
    time_based_escalation {
      minutes_failing = 5
    }
  }
}
